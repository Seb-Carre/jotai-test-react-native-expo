import SendData from "../api/apiRequests"
import { dataAtom } from "../screens/hooks/Connected/HomeScreen"
import { focusAtom } from "jotai/optics"
import { useAtom } from "jotai"

const dataLevel = focusAtom(dataAtom, (optic) => optic.prop("data"))

export function getModifiedAndNewItemsFromApi(dataFromApi : any[]) {
    const [data, setData] = useAtom(dataLevel)
    const dataCopy = data // on va juste faire une copie avec toutes les modifs et tout renvoyer
    if(dataFromApi){
        for(let i = 1; i <= data.length; i++){
            const item = dataFromApi[i]
            const index = dataCopy.findIndex(t=> t.id === item.id)
            if(index !== -1) { // the item exist, update it !
                dataCopy[index] = item
            }
            else {
                dataCopy.push(item) // if not just push it
            }

            if(i === data.length) {
                setData([...dataCopy]) // on met à jour le state !
            }
        }
    }
}


export async function sendAllDataHasNotSyncWithAPI() {

    // dans le meilleur des cas
    const [data, setData] = useAtom(dataLevel)

    const dataNotSync = data.filter(item => !item.isSyncWithAPI)

    await SendData(dataNotSync)

    const dataCopy = data

    dataCopy.forEach(item => item.isSyncWithAPI = true)

    setData([...dataCopy])
}