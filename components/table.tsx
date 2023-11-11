export interface ITableProps {
  title?: string,
  cols?: string[],
  data?: any[],
  onRowClick?: (event: React.MouseEvent, input: any) => void
}

export default function Table({title, cols, data, onRowClick: onClick}: ITableProps) {

  
  return (
    <div className={"max-h-[750px] flex flex-col bg-gray-200 w-full mt-2 rounded-xl p-5"}>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="flex">
          {cols && cols.map((col, index) => <div className="last:ml-auto mb-3" key={index}>{col}</div>)}
      </div>
      <ol className="flex flex-col h-full overflow-y-auto">
        {
          data && data.map((item, index) =>
          <div key={index} className="odd:bg-gray-300 grow p-2 hover:bg-gray-100 flex w-full" onClick={onClick && (e => onClick(e, item))} >
            {cols && cols.map((col, index) => 
              <div className="last:ml-auto" key={index}>{item[col]}</div>
            )
          }
          </div>
          )
        }
      </ol>
    </div>
  )
}