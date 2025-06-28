import refreshIcon from '@/asset/refresh.svg';
export default function Refresh({onClick}){

    return <div onClick={onClick}>
        <img src={refreshIcon} alt="Refresh Icon" className="w-6 h-6" />
    </div>
}