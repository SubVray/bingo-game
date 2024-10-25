const COLUMN_HEADERS = [
	{ letra: "B", rango: "1-15" },
	{ letra: "I", rango: "16-30" },
	{ letra: "N", rango: "31-45" },
	{ letra: "G", rango: "46-60" },
	{ letra: "O", rango: "61-75" },
]

const ColumnHeader = () => (
	<header className="flex w-full items-center justify-around py-1 text-lg">
		{COLUMN_HEADERS.map(({ letra, rango }) => (
			<div
				className="flex w-8 flex-col items-center justify-center xs:w-9 xsm:w-10"
				key={letra}
			>
				<span className="text-xl font-bold">{letra}</span>
				<span className="text-[10px] font-light">{rango}</span>
			</div>
		))}
	</header>
)

export default ColumnHeader
