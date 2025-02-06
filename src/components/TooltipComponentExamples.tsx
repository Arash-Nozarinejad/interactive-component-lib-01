import { Tooltip } from "./atoms/Tooltip/Tooltip";

function TooltipComponentExamples() {
    return (
      <div className="flex flex-col items-center gap-8 p-4">
        <h1 className="text-2xl font-bold">Tooltip Examples</h1>
  
        {/* Basic Tooltip */}
        <div className="flex items-center justify-center">
          <Tooltip content="This is a basic tooltip">
            <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
              Hover me
            </button>
          </Tooltip>
        </div>
  
        {/* Tooltips with Different Placements */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Tooltip content="Tooltip on top" placement="top">
            <button className="rounded-md bg-green-500 px-4 py-2 text-white">
              Top
            </button>
          </Tooltip>
          <Tooltip content="Tooltip on right" placement="right">
            <button className="rounded-md bg-green-500 px-4 py-2 text-white">
              Right
            </button>
          </Tooltip>
          <Tooltip content="Tooltip on bottom" placement="bottom">
            <button className="rounded-md bg-green-500 px-4 py-2 text-white">
              Bottom
            </button>
          </Tooltip>
          <Tooltip content="Tooltip on left" placement="left">
            <button className="rounded-md bg-green-500 px-4 py-2 text-white">
              Left
            </button>
          </Tooltip>
        </div>
  
        {/* Tooltip with Rich HTML Content */}
        <div className="flex items-center justify-center">
          <Tooltip
            content={
              <div className="text-center">
                <strong>Rich Content</strong>
                <p>Multiple lines</p>
              </div>
            }
          >
            <button className="rounded-md bg-purple-500 px-4 py-2 text-white">
              Rich Content
            </button>
          </Tooltip>
        </div>
      </div>
    );
  }

export default TooltipComponentExamples;
