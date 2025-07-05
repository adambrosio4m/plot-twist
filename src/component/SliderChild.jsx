export default function SliderChild({children}) {

    return <div className='h-lvh snap-start relative'>
        <div className='h-lvh flex flex-col justify-center items-center'>
            {children}
        </div>
    </div>
}