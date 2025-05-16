import { getMentors } from "@/actions/mentor-actions"
import MentorsGrid from "./mentors-grid"

export default async function MentorsPage() {
    const mentors = await getMentors()
    return (
        <>
            <h1 className="text-2xl font-bold">Mentors</h1>
            <MentorsGrid mentors={mentors}/>
        </>

    )
}