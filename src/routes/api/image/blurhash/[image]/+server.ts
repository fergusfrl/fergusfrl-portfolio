import { encode } from 'blurhash';
import sharp from 'sharp';

const CONFIG = {
	cache: {
		preview: {
			sMaxAge: 86400,
			maxAge: 86400
		}
	}
};

const encodeImageToBlurhash = (path: Buffer): Promise<string> =>
	new Promise((resolve, reject) => {
		sharp(path)
			.raw()
			.ensureAlpha()
			.resize(32, 32, { fit: 'inside' })
			.toBuffer((err, buffer, { width, height }) => {
				if (err) return reject(err);
				resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
			});
	});

export async function GET({ params }: { params: { image: string } }) {
	const { image } = params;

	const decodedUrl = decodeURIComponent(image);

	const input = await fetch(decodedUrl);

	const arrayBuffer = await input.arrayBuffer();

	const buffer = Buffer.from(arrayBuffer);

	const blurhash = await encodeImageToBlurhash(buffer);

	return new Response(JSON.stringify({ blurhash: blurhash }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': `public, max-age=${CONFIG.cache.preview.maxAge}, s-maxage=${CONFIG.cache.preview.sMaxAge}`
		}
	});
}
