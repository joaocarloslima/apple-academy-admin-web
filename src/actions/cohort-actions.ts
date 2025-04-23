import ky from 'ky';

const BASE_URL = process.env.API_BASE_URL
const api = ky.create({
    prefixUrl: BASE_URL,
})

const cohortApi = api.extend((options) => ({prefixUrl: `${options.prefixUrl}/cohort`}));


export async function getCohorts() {
    const json = await cohortApi.get("").json<Cohort>()
    console.log(json)
    return json
}