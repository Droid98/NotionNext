import { Fragment, useRef, useImperativeHandle, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import SocialButton from './SocialButton'
import { siteConfig } from '@/lib/config'
import Footer from './Footer' // <-- 修改了这里，使用相对路径

/**
 * 侧拉抽屉
 * @returns
 */
export default function SlideOvers({ children, cRef }) {
  const [open, setOpen] = useState(false)
  const slideOversRef = useRef({})

  /**
  * 函数组件暴露方法
  */
  useImperativeHandle(cRef, () => ({
    toggleSlideOvers: toggleSlideOvers
  }))

  const toggleSlideOvers = () => {
    setOpen(!open)
  }

  return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog ref={slideOversRef} as="div" className="relative" onClose={setOpen}>
                {/* 遮罩 */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} className="fixed inset-0 z-10 glassmorphism transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden z-10">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed bottom-0 right-0 max-w-full flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-y-full"
                                enterTo="translate-y-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-y-0"
                                leaveTo="translate-y-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen">
                                    <div className="h-full flex flex-col bg-gray-800 shadow-xl overflow-y-scroll scroll-hidden">
                                        <div className="p-6">
                                            {children}
                                        </div>
                                        <div className="relative mt-auto">
                                            <div className='relative overflow-hidden z-10 p-4'>
                                                <h2 className='text-3xl font-light text-gray-200'>联系站长</h2>
                                                <p className='text-gray-400 mt-2'>邮箱：droid1998a@gmail.com{siteConfig('CONTACT_EMAIL')}</p>
                                                <div className='mt-4'>
                                                    <SocialButton/>
                                                </div>
                                            </div>
                                            {/* 使用新设计的Footer组件 */}
                                            <Footer/>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
  )
}
