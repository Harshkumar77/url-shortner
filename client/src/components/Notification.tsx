export default function Notification({ children }: NotificationProps) {
    return <>
        {
            children && <h1 className="bg-filler outline outline-1 p-2 inline rounded fixed top-0 right-0 m-8 outline-primary w-[18ch]">{children}</h1>
        }
    </>

}

interface NotificationProps {
    children?: string
}