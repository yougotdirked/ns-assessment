export interface ITableProps {
  title?: string,
  data?: any[]
}

export default function Table({title, data}: ITableProps) {

  
  return (
    <div className={"max-h-[750px] flex flex-col bg-gray-200 w-full mt-2 rounded-xl p-5"}>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ol className="flex flex-col h-full overflow-y-auto">
        {
          data && data.map((item, index) =>
          <div key={index} className="odd:bg-gray-300 grow p-2 hover:bg-gray-100 flex w-full">
            <div>{item.name}</div>
            <div className="ml-auto">Forks: {item.forks}</div>
          </div>)
        }
      </ol>
    </div>
  )
}