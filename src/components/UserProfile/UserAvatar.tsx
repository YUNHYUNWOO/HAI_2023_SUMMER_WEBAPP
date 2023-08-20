
interface props {
    initial : string
}


export function UserAvatar({initial} : props){
    return <div className="avatar placeholder">
                <div className="w-12 rounded-full bg-neutral-focus text-neutral-content">
                    <span className="text-3xl">{initial} </span>
                </div>
            </div>;
}