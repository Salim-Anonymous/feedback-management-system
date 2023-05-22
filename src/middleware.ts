import {withAuth} from "next-auth/middleware";
export default withAuth(
    async (req,res) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        res.status(200).json({message: 'You are... authenticated'})
    },{
        callbacks: {
            authorized({token}){
                console.log("success")
                return token?.role === 'ADMIN'
            }
        }
    }
)

export const config = {matcher: '/api/auth/check'}