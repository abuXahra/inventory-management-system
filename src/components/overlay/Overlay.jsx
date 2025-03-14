
import React from 'react'
import { CloseIcon, OverlayButton, OverlayCard, OverlayWrapper } from './Overlay.style'
import { FaTimes } from 'react-icons/fa'
import Button from '../clicks/button/Button'

export default function Overlay({children, contentHight, contentWidth, overlayButtonClick, closeOverlayOnClick, btnText1, btnText2, btnDisplayNo, alternatFunc, contentAlignment}) {
  return (
    <OverlayWrapper>
      <OverlayCard contentHight={contentHight} contentWidth={contentWidth} contentAlignment={contentAlignment}>
     {/* close icon */}
      <CloseIcon ><span onClick={closeOverlayOnClick}><FaTimes/></span></CloseIcon>
          
          {/* Overlay content */}
          {children}

          {/* Overlay buttons */}
        <OverlayButton>
            <Button 
              btnColor={'green'}
              btnText={btnText1 ? btnText1 : 'Yes'}
              // btnPd={'10px 20px'}
              btnPd={'15px 30px'}
              btnOnClick={overlayButtonClick}
            />
            <Button 
              btnColor={'black'}
              btnText={btnText2 ? btnText2 : 'No'}
              // btnPd={'10px 20px'}
              btnPd={'15px 30px'}
              btnOnClick={alternatFunc? alternatFunc: closeOverlayOnClick}
              btnDisplay={btnDisplayNo}
            />
        </OverlayButton>
      </OverlayCard>
    </OverlayWrapper>
  )
}
