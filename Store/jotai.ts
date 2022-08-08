import { atom } from "jotai";

type Folder = {
  id: number;
  parentFolderId: number;
  name: string;
  isSyncWithAPI: boolean;
  type: string;
};

type Password = {
  id: number;
  parentFolderId: number;
  name: string;
  isSyncWithAPI: boolean;
  type: string;
  tags: string[];
  password: { encrytedPassword: string; iv: Buffer };
};

const initialState = {
  data: [
    {
      id: 1,
      parentFolderId: 0,
      name: "Documents",
      isSyncWithAPI: false,
      type: "folder",
    },
    {
      id: 2,
      parentFolderId: 0,
      name: "Dropbox Password",
      isSyncWithAPI: false,
      type: "password",
      tags: ["cloud", "data"],
      encrytedPassword: {
        password: "",
        iv: "",
      },
    },
  ],
};

var newItems = new Array(1000000);
for (var i = 3; i < newItems.length; i++) {
  const isOdd = i % 2 == 1;
  if (isOdd) {
    initialState.data.push({
      id: i,
      parentFolderId: 1,
      name: "Document " + i,
      isSyncWithAPI: false,
      type: "folder",
    });
  } else {
    initialState.data.push({
      id: i,
      parentFolderId: 1,
      name: "Password " + i,
      isSyncWithAPI: false,
      type: "password",
      tags: ["cloud", "data"],
      encrytedPassword: {
        password: "",
        iv: "",
      },
    });
  }
}

export default initialState;
// export const dataAtom = atom(initialState); // il y a 1 000 000 de données dans cet atome !
