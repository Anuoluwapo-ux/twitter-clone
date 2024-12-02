import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

const useFollow = () => {
    const queryclient = useQueryClient();

    const { mutate: follow, isPending } = useMutation({
        mutationFn: async (userId) => {
            try {
                const res = await fetch(`https://twitter-clone-backend-taupe.vercel.app/?vercelToolbarCode=Aie9ug32saHCvnW/api/users/follow/${userId}`, {
                    method: "POST",
                })

                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "something wenr wrong")
                }
                return
            } catch (error) {
                throw new Error(error.message)
            }
        },
        onSuccess: () => {
            Promise.all([
                queryclient.invalidateQueries({ queryKey: ['suggestedUsers'] }),
                queryclient.invalidateQueries({ queryKey: ['authUser'] })
            ])
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return {follow, isPending}
}

export default useFollow;