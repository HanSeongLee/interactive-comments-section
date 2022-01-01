import useSWR from 'swr'
import axios from 'axios'

const fetcher = (request) => axios(request || {}).then(response => response.data);

export default function useRequest(request) {
    return useSWR(request, fetcher);
}
