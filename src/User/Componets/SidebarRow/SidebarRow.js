import React from 'react'
import './SidebarRow.css'
function SidebarRow({Selected,title,Icon}) {
    
    return (
        <div className={`sidebarRow ${Selected &&"selected"}`}>
            <Icon className="sidebarRow_icon"/>
            <h4 className="sidebarRow_title">{title}</h4>
        </div>
    )
}

export default SidebarRow
