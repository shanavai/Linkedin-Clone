import { auth, provider, storage } from "../firebase";
import db from "../firebase";
import { SET_USER, SET_LOADING_STATE, GET_POSTS } from "./actionType"

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload
});

export function signInAPI(){
    return(dispatch) => {
        auth.signInWithPopup(provider).then((payload)=> {
            dispatch(setUser(payload.user))
            console.log('first', payload.user)
        }).catch((error) => alert(error.message))
    }
}

export function getUserAuth() {
    return (dispatch) => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          dispatch(setUser(user));
        }
      });
    };
  }
  

  export function signOutAPI() {
    return (dispatch) => {
      auth
        .signOut()
        .then(() => {
          dispatch(setUser(null));
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
  }   

  export const setLoading = (status) => ({
    type: SET_LOADING_STATE,
    status: status,
  });

  export function postArticleAPI(payload) {
    return (dispatch) => { 
      dispatch(setLoading(true));
      
      if (payload.image !== "") {
        const upload = storage
          .ref(`images${payload.image.name}`)
          .put(payload.image);
        upload.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  
            console.log(`Progress: ${progress}%`);
            if (snapshot.state === "RUNNING") {
              console.log(`Progress: ${progress}%`);
            }
          },
          (error) => console.log(error.code),
          async () => {
            const downLoadURL = await upload.snapshot.ref.getDownloadURL();
            db.collection("posts").add({
              actor: {
                description: payload.user.email,
                title: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,
              },
              video: payload.video,
              sharedImg: downLoadURL,
              comments: 0,
              description: payload.description,
            }); 
            dispatch(setLoading(false));
          }
        );
      } else if (payload.video) {
        db.collection("posts").add({
          actor: {
            description: payload.user.email,
            title: payload.user.displayName,
            date: payload.timestamp,
            image: payload.user.photoURL,
          },
          video: payload.video,
          sharedImg: "",
          comments: 0,
          description: payload.description,
        });
        dispatch(setLoading(false)); 
      }
    };
  }

   export const getPosts = (payload) => ({
    type: GET_POSTS,
    payload: payload,
  });

  export function getArticleAPI() {
    return (dispatch) => {
      let payload;
      db.collection("posts")
        .orderBy("actor.date", "desc")
        .onSnapshot((snapshot) => {
          payload = snapshot.docs.map((doc) => doc.data());
          dispatch(getPosts(payload))
        });
    };
  }

 