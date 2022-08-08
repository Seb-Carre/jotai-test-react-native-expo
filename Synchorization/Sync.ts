import { useAtom } from "jotai";
import { focusAtom } from "jotai/optics";

import SendMultipleData, { SendData, getStatus } from "../api/apiRequests";
import NetInfo from "../network/NetInfo";
import { dataAtom } from "../screens/hooks/Connected/HomeScreen";

const dataLevel = focusAtom(dataAtom, (optic) => optic.prop("data"));

export async function Sync(item: any | null = null, data: any, setData: any) {
  // si on veut synchroniser une donnée ou juste faire une syncho générale
  const checkConnection = await NetInfo.fetch(); // récupération de l'état internet !
  if (checkConnection?.isInternetReachable) {
    // vérification de la connexion internet si la synchro est possible
    const dataNotSync = data.filter((item) => !item.isSyncWithAPI); // au passage nous allons vérifier si nous avons des éléments non synchro
    if (dataNotSync.length > 0) {
      // si il y a des éléments non synchro alors on envoie tout
      if (item) {
        dataNotSync.push(item);
      }
      const request = await SendMultipleData(dataNotSync);
      if (request.status) {
        const dataCopy = data;
        dataCopy.forEach((item) => (item.isSyncWithAPI = true));
        setData([...dataCopy]);

        if (request.items) {
          // si l'api renvoie en retour un champ items alors il faut tout synchroniser sur l'appli
          getModifiedAndNewItemsFromApi(request.items, data, setData);
        }
      }
    } else if (item) {
      const request = await SendData(item);
      if (request.status) {
        const dataCopy = data;
        const index = dataCopy.findIndex((t) => t.id === item.id);
        item.isSyncWithAPI = true;
        if (index !== -1) {
          dataCopy[index] = item;
          setData([...dataCopy]); // on met à jour le state !
          if (request.items) {
            // si l'api renvoie en retour un champ items alors il faut tout synchroniser sur l'appli
            getModifiedAndNewItemsFromApi(request.items, data, setData);
          }
        }
      }
    } else {
      const request = await getStatus(); // faire la sync sans envoyer aucune donnée
      if (request.status && request.items) {
        getModifiedAndNewItemsFromApi(request.items, data, setData);
      }
    }
  }
}

export function getModifiedAndNewItemsFromApi(
  dataFromApi: any[],
  data: any,
  setData: any
) {
  const dataCopy = data; // on va juste faire une copie avec toutes les modifs et tout renvoyer
  if (dataFromApi) {
    for (let i = 1; i <= data.length; i++) {
      const item = dataFromApi[i];
      const index = dataCopy.findIndex((t) => t.id === item.id);
      if (index !== -1) {
        // the item exist, update it !
        dataCopy[index] = item;
      } else {
        dataCopy.push(item); // if not just push it
      }

      if (i === data.length) {
        setData([...dataCopy]); // on met à jour le state !
      }
    }
  }
}
