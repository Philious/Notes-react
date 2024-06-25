import '@/components/scratchPad.scss';
import { useState } from "react"
import IconButton from "@/components/IconButton";
import { Icon, ButtonType } from "@/types/enums";


const ScratchPad = () => {
  const [ active, setActive ] = useState(false);
  const [ inputValue ] = useState('');

  const toggle = () => setActive(!active);
  const arrow = {
    type: ButtonType.Border,
    icon: Icon.Up,
    action: () => {}
  }
  const update = () => {}
  const lazyUpdate = () => {}
  return (
    <div className={`scratch-pad ${ active ? 'active' : '' }`}>
      <div
        className="scratch-pad-header"
        onClick={ toggle }
      >
        <label className="header">Scratch pad</label>
        <div className="scratch-pad-options">
          <div className="arrow-icon">
            <IconButton {...arrow} />
          </div>
        </div>
      </div>
      <textarea
        className="scratch-pad-area"
        value={inputValue}
        onBlur={update}
        onInput={lazyUpdate}
      />
    </div>
  )
}

export default ScratchPad;