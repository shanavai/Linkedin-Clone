import { useEffect, useState } from "react";
import styled from "styled-components";
import PostModal from "./PostModal";
import { useSelector, useDispatch } from "react-redux";
import { getArticleAPI } from "../actions";
import ReactPlayer from "react-player";

const Main = () => {
  const [showModal, setShowModal] = useState("close");
  const user = useSelector((state) => state.userState.user);
  const posts = useSelector((state) => state.postReducer.posts);
  const loading = useSelector((state) => state.postReducer.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticleAPI());
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  return (
    <>
      {" "}
      <Container>
        <ShareBox>
          <div>
            {user && user.photoURL ? (
              <img src={user.photoURL} alt="" />
            ) : (
              <img src="/images/user.svg" alt="" />
            )}
            <button onClick={handleClick} disabled={loading ? true : false}>
              Start a post
            </button>
          </div> 
        </ShareBox> 
        
        {posts.length === 0 ? (
          <p>There are no Articles</p>
        ) : (
          <Content>
            {posts.length > 0 &&
              posts.map((post, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img src={post.actor.image} alt="" />
                      <div>
                        <span>{post.actor.title}</span>
                        <span>{post.actor.description}</span>
                        <span>
                          {post.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <img src="/images/ellipsis.svg" alt="" />
                    </button>
                  </SharedActor>
                  <Description>{post.description}</Description>
                  <SharedImg>
                    <a>
                      {!post.sharedImg && post.video ? (
                        <ReactPlayer width={"100%"} url={post.video} />
                      ) : (
                        post.sharedImg && <img src={post.sharedImg} alt="" />
                      )}
                    </a>
                  </SharedImg>
                  <SocialCounts>
                    <li>
                      <button>
                        <img src="/images/clap.svg" alt="Clapping emoji" />
                        <span>1</span>
                      </button>
                    </li> 
                  </SocialCounts>
                  <SocialActions>
                    <p>
                      <button>
                        <img src="/images/like-1.svg" alt="Like icon" />
                      </button>
                      <span>Like</span>
                    </p>
                    <p>
                      <button>
                        <img src="/images/comments.svg" alt="Comments icon" />
                      </button>
                      <span>Comments</span>
                    </p>
                    <p>
                      <button>
                        <img src="/images/share.svg" alt="Share icon" />
                      </button>
                      <span>Share</span>
                    </p>
                    <p>
                      <button>
                        <img src="/images/send.svg" alt="Send icon" />
                      </button>
                      <span>Send</span>
                    </p>
                  </SocialActions>
                </Article>
              ))}
          </Content>
        )}
        <PostModal showModal={showModal} handleClick={handleClick} />
      </Container>
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white; 
  padding: 15px;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 60px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: auto;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: center;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  img {
    width: 20px;
  }
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      align-items: center;
      border: none;
      background: transparent;
    }
  }
`;

const SocialActions = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 40px;
  margin: 0;
  padding: 8px;
  p {
    display: flex;
    align-items: center;
  }
  img {
    width: 20px;
  }
  button {
    padding: 8px;
    border: none;
    background: transparent;
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }loading
  }
  span {
    color: #0a66c2;
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

export default Main;
