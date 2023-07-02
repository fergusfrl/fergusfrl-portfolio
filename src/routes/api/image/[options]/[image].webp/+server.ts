import sharp from 'sharp';
import isoFetch from 'isomorphic-unfetch';

const CONFIG = {
	cache: {
		image: {
			sMaxAge: 86400,
			maxAge: 86400
		}
	}
};

// Convert option in a string format to a key-value pair
// key=value   { [key]: value }
// key         { [key]: true }
const optionToKeyVal = (option: string) =>
	((split) => (split.length > 0 ? { [split[0]]: split.length > 1 ? split[1] : true } : undefined))(
		option.split('=')
	);

// Parse options string and return options object
const parseOptions = (options: string) => {
	return options.split('&').reduce((acc, option) => ({ ...acc, ...optionToKeyVal(option) }), {});
};

export async function GET({ params }: { params: { image: string; options: string } }) {
	const { options, image } = params;
	console.log('IMAGE:', image);

	const decodedUrl = decodeURIComponent(image);

	const parsedOptions = parseOptions(options) as { w: string; h: string; q: string };

	const readStream = await isoFetch(decodedUrl);

	const transform = sharp()
		.resize(
			parsedOptions.w ? Number(parsedOptions.w) : undefined,
			parsedOptions.h ? Number(parsedOptions.h) : undefined,
			{ fit: 'cover' }
		)
		.webp({ quality: Number(parsedOptions.q) || 80 });

	const headers = new Headers();
	headers.append('Content-Type', 'image/webp');
	headers.append(
		'Cache-Control',
		`public, max-age=${CONFIG.cache.image.maxAge}, s-maxage=${CONFIG.cache.image.sMaxAge}`
	);

	return {
		body: readStream.body?.pipeThrough(transform),
		encoding: 'binary'
	};
}
