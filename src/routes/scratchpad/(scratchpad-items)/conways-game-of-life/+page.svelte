<script lang="ts">
	import { onDestroy } from 'svelte';
	import Cell from '../../../../components/Cell.svelte';
	import Controls from '../../../../components/Controls.svelte';

	const SPEED_IN_MILLISECONDS = 200;
	const GRID_SIZE = 35;

	let cells: number[][] = [];
	let isPlaying = false;
	let gameLoop: ReturnType<typeof setInterval>;

	clearAllCells();

	function populateCells(percentageAlive: number) {
		for (let x = 0; x < GRID_SIZE; x++) {
			cells[x] = [];
			for (let y = 0; y < GRID_SIZE; y++) {
				cells[x][y] = Math.ceil(Math.random() * 100) <= percentageAlive ? 1 : 0;
			}
		}
	}

	function clearAllCells() {
		populateCells(0);
	}

	function handleCellClick({ detail: { x, y } }: { detail: { x: number; y: number } }) {
		cells[x][y] = !!cells[x][y] ? 0 : 1;
	}

	function togglePlay() {
		if (isPlaying) {
			isPlaying = false;
			clearInterval(gameLoop);
			return;
		}

		isPlaying = true;
		gameLoop = setInterval(() => {
			nextStep();
		}, SPEED_IN_MILLISECONDS);
	}

	function nextStep() {
		const nextGen: number[][] = [];
		for (let i = 0; i < cells.length; i++) {
			nextGen[i] = [...cells[i]];
		}

		for (let x = 0; x < GRID_SIZE; x++) {
			for (let y = 0; y < GRID_SIZE; y++) {
				const isAlive = !!cells[x][y];
				const liveNeighbours = countLiveNeighbours(x, y);

				if (isAlive) {
					if (liveNeighbours < 2) {
						nextGen[x][y] = 0;
					}
					if (liveNeighbours === 2 || liveNeighbours === 3) {
						nextGen[x][y] = 1;
					}
					if (liveNeighbours > 3) {
						nextGen[x][y] = 0;
					}
				}

				if (!isAlive) {
					if (liveNeighbours !== 3) {
						nextGen[x][y] = 0;
					}
					if (liveNeighbours === 3) {
						nextGen[x][y] = 1;
					}
				}
			}
		}
		cells = nextGen;
	}

	function countLiveNeighbours(x: number, y: number) {
		let count = 0;

		if (x - 1 >= 0) {
			if (cells[x - 1][y] === 1) count++;
		}
		if (x + 1 < GRID_SIZE) {
			if (cells[x + 1][y] === 1) count++;
		}
		if (y - 1 >= 0) {
			if (cells[x][y - 1] === 1) count++;
		}
		if (y + 1 < GRID_SIZE) {
			if (cells[x][y + 1] === 1) count++;
		}
		if (x - 1 >= 0 && y - 1 >= 0) {
			if (cells[x - 1][y - 1] === 1) count++;
		}
		if (x - 1 >= 0 && y + 1 < GRID_SIZE) {
			if (cells[x - 1][y + 1] === 1) count++;
		}
		if (x + 1 < GRID_SIZE && y + 1 < GRID_SIZE) {
			if (cells[x + 1][y + 1] === 1) count++;
		}
		if (x + 1 < GRID_SIZE && y - 1 >= 0) {
			if (cells[x + 1][y - 1] === 1) count++;
		}

		return count;
	}

	function randomise() {
		populateCells(50);
	}

	onDestroy(() => {
		clearInterval(gameLoop);
	});
</script>

<ol class="list-decimal">
	<li>
		Any live cell with fewer than two live neighbours <strong>dies</strong>, as if by
		underpopulation.
	</li>
	<li>
		Any live cell with two or three live neighbours <strong>lives</strong> on to the next generation.
	</li>
	<li>
		Any live cell with more than three live neighbours <strong>dies</strong>, as if by
		overpopulation.
	</li>
	<li>
		Any dead cell with exactly three live neighbours <strong>becomes a live cell</strong>, as if by
		reproduction.
	</li>
</ol>

<div class=" flex">
	{#each cells as row, x (row)}
		<div class="border-black last:border-r">
			{#each row as cell, y (`${x}, ${y}`)}
				<Cell {x} {y} active={!!cell} on:click={handleCellClick} />
			{/each}
		</div>
	{/each}
</div>

<Controls
	{isPlaying}
	on:clearCells={clearAllCells}
	on:togglePlay={togglePlay}
	on:randomise={randomise}
/>
