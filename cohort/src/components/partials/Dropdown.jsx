import React from 'react'

const Dropdown = ({title,options,func}) => {
    return (
        <div className="inline-block mt-4">
            <select
            onChange={func}
                name="format"
                id="format"
                className="
                    bg-zinc-800 text-zinc-300
                    px-4 py-2
                    rounded-lg
                    border border-zinc-700
                    focus:outline-none
                    focus:border-yellow-400
                    cursor-pointer
                    shadow-sm
                "
                defaultValue="0"
            >
                <option value="0" disabled>Select Format</option>
                {options.map((o,i)=>{
                    return (
                        <option key={i} value={o}>{o.toUpperCase()}</option>
                    )
                })}

            </select>
        </div>
    )
}

export default Dropdown
