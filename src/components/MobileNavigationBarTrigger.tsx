import DownArrow from '../icons/DownArrow'
import type {SortingAlgorithmProps} from '../utils/types'

const MobileNavigationBarTrigger = ({algorithm, openDrawer}: {algorithm: SortingAlgorithmProps | undefined; openDrawer: () => void}) => {
  return (
    <div
      className="lg:hidden flex justify-start items-center px-4 py-2 text-sky-100 font-medium bg-sky-900/30  border border-solid border-sky-900 rounded-md cursor-pointer"
      onClick={() => openDrawer()}
    >
      <span>{algorithm ? algorithm.introduction.title : ''}</span>
      <DownArrow />
    </div>
  )
}

export default MobileNavigationBarTrigger
