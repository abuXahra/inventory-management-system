

import React, { useState } from 'react'
import { QuickLinkContent, QuickLinkHeader, QuickLinkItems, QuickLinkWrapper } from './quickLinks.style'
import { SidebarItemLists } from '../../data/SidebarItemList';
import { useNavigate } from 'react-router-dom';

export default function QuickLinks() {

    const [quickLinkItems, setQuickLinkItems] = useState(SidebarItemLists);

    const navigate = useNavigate();

    const dsp = (url)=>{
        if(url === '/dashboard' || url ==="/users" || url==="/payment" || url ==="/expenses"){
            return 'none'
        }

        return 'flex';
    }

  return (
    <QuickLinkWrapper>
        <QuickLinkHeader>
            QuickLinks
        </QuickLinkHeader>
        <QuickLinkContent>
        { quickLinkItems.map((data, i)=>(
                <QuickLinkItems key={i} qds={dsp(data.url)} onClick={()=>navigate(data.url)}>
                    <span>{data.icon}</span> 
                    <span>{data.tile}</span>
                </QuickLinkItems>
            ))  
        }
        </QuickLinkContent>
    </QuickLinkWrapper>
  )
}
