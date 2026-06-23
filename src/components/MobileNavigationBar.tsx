import {useEffect, useRef, useState} from 'react'
import type {SortingAlgorithmProps} from '../utils/types'
import {AlgorithmItems} from './NavigationBar'
import {twMerge} from 'tailwind-merge'

const MobileNavigationBar = ({
  algorithms,
  currentId,
  onIdChange,
  mode,
  active,
  closeDrawer,
}: {
  algorithms: SortingAlgorithmProps[]
  currentId: number
  onIdChange: (id: number) => void
  mode: 'simulation' | 'manual'
  active: boolean
  closeDrawer: () => void
}) => {
  const [isDown, setIsDown] = useState<boolean>(false)
  const [isOut, setIsOut] = useState<boolean>(false)
  const [originClick, setOriginClick] = useState<number>(0)
  const [distance, setDistance] = useState<number>(0)
  const [drawerUp, setDrawerUp] = useState<boolean>(active)
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const [drawerHeight, setDrawerHeight] = useState<number>(0)
  useEffect(() => {
    const drawer = drawerRef.current
    function mouseDownHandler(e: MouseEvent) {
      e.preventDefault()
      if (drawer && drawer.contains(e.target as Node)) {
        setIsDown(true)
        setOriginClick(e.clientY)
      } else if (active && drawerUp && isOut) {
        setDrawerUp(false)
        setTimeout(() => {
          closeDrawer()
        }, 300)
      }
    }

    function mouseUpHandler(e: MouseEvent) {
      e.preventDefault()
      setIsDown(false)
      if (drawer) {
        if (distance < 100 && isDown) {
          setDistance(0)
        } else if (distance > 100 && isDown) {
          setDrawerUp(false)
          setTimeout(() => {
            closeDrawer()
          }, 300)
        }
      }
    }

    function mouseLeaveHandler(e: MouseEvent) {
      e.preventDefault()
      setIsOut(true)
    }
    function mouseEnterHandler(e: MouseEvent) {
      e.preventDefault()
      setIsOut(false)
    }

    function mouseMoveHandler(e: MouseEvent) {
      e.preventDefault()
      if (drawer && isDown) {
        setDistance(e.clientY - originClick)
      }
    }

    if (drawer && active && drawerUp) {
      setDrawerHeight(drawer.clientHeight)
      window.addEventListener('mousedown', mouseDownHandler)
      window.addEventListener('mouseup', mouseUpHandler)
      drawer.addEventListener('mousemove', mouseMoveHandler)
      drawer.addEventListener('mouseleave', mouseLeaveHandler)
      drawer.addEventListener('mouseenter', mouseEnterHandler)
    }
    return () => {
      window.removeEventListener('mousedown', mouseDownHandler)
      window.removeEventListener('mouseup', mouseUpHandler)
      drawer?.removeEventListener('mousemove', mouseMoveHandler)
      drawer?.removeEventListener('mouseleave', mouseLeaveHandler)
      drawer?.removeEventListener('mouseenter', mouseEnterHandler)
    }
  }, [drawerRef, isDown, originClick, distance, closeDrawer, drawerHeight, active, drawerUp, isOut])

  useEffect(() => {
    if (active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDistance(0)
      setDrawerUp(true)
    }
  }, [active])

  const handleIdChange = (id: number) => {
    onIdChange(id)
    setDrawerUp(false)
    setTimeout(() => {
      closeDrawer()
    }, 300)
  }

  return (
    <div className={`${active ? 'visible' : 'hidden'} fixed inset-0 z-1`}>
      <div
        className={`fixed inset-0 z-2 bg-black/80`}
        style={{transition: isDown ? 'none' : 'opacity 0.3s', opacity: active && drawerUp ? (drawerHeight - distance) / drawerHeight : 0}}
      ></div>
      <div
        ref={drawerRef}
        className={twMerge(
          `lg:hidden absolute z-3 left-0 bottom-0 bg-black w-full px-6 pt-4 pb-2 border-t border-solid border-sky-900 rounded-t-2xl`,
          `${isDown ? 'transition-none' : 'transition-transform duration-300'} ${drawerUp ? 'translate-y-0' : 'translate-y-full'}`,
        )}
        style={{transform: `translateY(${distance > 0 ? distance : Math.max(-15, distance / 3)}px)`}}
      >
        <button className="block mx-auto mb-2 w-25 h-2 bg-sky-100 hover:bg-sky-200 rounded-full cursor-pointer"></button>
        <AlgorithmItems mode={mode} algorithms={algorithms} currentId={currentId} onIdChange={handleIdChange} />
      </div>
    </div>
  )
}

export default MobileNavigationBar
