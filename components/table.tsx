export interface ITableProps {
  title?: string,
  labelCols?: {label: string, col: string}[],
  data?: any[],
  onRowClick?: (event: React.MouseEvent, input: any) => void
}

export default function Table({title, labelCols, data, onRowClick: onClick}: ITableProps) {
  
  return (
    <div className={"max-h-[750px] flex flex-col bg-gray-200 w-full mt-2 rounded-xl p-5"}>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="flex">
          {labelCols && labelCols.map((value, index) => <div className="mx-auto first:ml-0 flex-1 last:mr-0 mb-3" key={index}>{value.label}</div>)}
      </div>
      <ol className="flex flex-col h-full overflow-y-auto">
        {
          data && data.map((item, index) =>
          <li key={index} className="odd:bg-gray-300 grow p-2 hover:bg-gray-100 flex w-full" onClick={onClick && (e => onClick(e, item))} >
            {labelCols && labelCols.map((value, index) => 
              <td className="flex-1 mx-auto last:mr-0 first:ml-0" key={index}>{item[value.col]}</td>
            )
          }
          </li>
          )
        }
      </ol>
    </div>
  )
}