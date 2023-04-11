import { toast } from 'bulma-toast'

export const Home = () => {
    const toasty = () => {
        toast({
            message: 'toast tested succssefuly',
            type: 'is-success',
            pauseOnHover: true,
            duration: 2000,
            position: 'bottom-right',
        })
    }
    return <button onClick={toasty}>test bulma toast</button>
}