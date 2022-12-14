import axios from "axios";
import { createContext, useState } from "react";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

export const BlogContext = createContext();

const BlogContextProvider = (props) => {
  const [detailLoading, setDetailLoading] = useState(true)

  const [blogDetail, setBlogDetail] = useState([]);

  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true)

  const [categories, setCategories] = useState([]);


  const [limit, setLimit] = useState(1000);

  const [userPosts, setUserPosts] = useState([]);

  const base_url = "https://stocks.pythonanywhere.com/"

  const getBlogs = async () => {

    const blogUrl = base_url + `api/posts/?limit=${limit}&offset=0`
    try {
      const res = await axios.get(blogUrl)
      setBlogs(res.data.results)
      setLoading(false)
      return res;
    } catch (error) {
      toastErrorNotify(error.message)
    }
  }
  async function getOneBlog(slug) {
    const token = window.atob(sessionStorage.getItem('token'));

    try {
      var config = {
        method: 'get',
        url: `${base_url}api/posts/${slug}`,
        headers: {
          'Authorization': `Token ${token}`,
        }
      };
      const result = await axios(config);
      setDetailLoading(false);
      setBlogDetail(result.data);
    } catch (error) {
      toastErrorNotify(error.message)
    }
  }

  const setComments = async (slug, commendData) => {
    const token = window.atob(sessionStorage.getItem('token'));
    const commentUrl = base_url + `api/posts/${slug}/add_comment/`;
    try {
      const data = {
        "content": commendData
      };
      var config = {
        method: 'post',
        url: commentUrl,
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        data: data
      };
      await axios(config)
      getOneBlog(slug);
    } catch (error) {
      toastErrorNotify(error.message)
    }
  }

  async function getCategory() {

    try {
      var config = {
        method: 'get',
        url: `${base_url}api/category/`,
      };
      const result = await axios(config);
      setCategories(result.data);
    } catch (error) {
      toastErrorNotify(error.message)
    }
  }

  const createPost = async (data, navigate) => {

    const token = window.atob(sessionStorage.getItem('token'));

    var config = {
      method: 'post',
      url: `${base_url}api/posts/`,
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    try {
      const res = await axios(config);
      if (res.status === 201) {
        toastSuccessNotify("New blog created successfully.")
        navigate("/")
      }
    } catch (error) {
      toastErrorNotify(error.message);
    }
  }

  const updatePost = async (data, navigate, slug) => {

    const token = window.atob(sessionStorage.getItem('token'));

    var config = {
      method: 'put',
      url: `${base_url}api/posts/${slug}/`,
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    try {
      const res = await axios(config);
      if (res.status === 200) {
        toastSuccessNotify("Post updated successfully.")
        navigate(-1)
      }
    } catch (error) {
      toastErrorNotify(error.message);
    }
  }

  const deletePost = async (navigate, slug) => {

    const token = window.atob(sessionStorage.getItem('token'));

    var config = {
      method: 'delete',
      url: `${base_url}api/posts/${slug}/`,
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios(config);

      if (res.status === 204) {
        toastSuccessNotify("Post deleted successfully.")
        navigate("/")
      }
    } catch (error) {
      toastErrorNotify(error.message);
    }
  }

  const usersAllPosts = async () => {
    const token = window.atob(sessionStorage.getItem('token'));
    const config = {
      method: 'get',
      url: `${base_url}api/all-posts/`,
      headers: {
        'Authorization': `Token ${token}`,
      }
    };
    try {

      const res = await axios(config)
      setUserPosts(res.data)
    } catch (error) {
      toastErrorNotify(error.message)
    }
  }

  let value = {
    blogs,
    setBlogs,
    getBlogs,
    getOneBlog,
    blogDetail,
    detailLoading,
    setComments,
    getCategory,
    categories,
    createPost,
    updatePost,
    deletePost,
    usersAllPosts,
    userPosts,
    loading
  }



  return (
    <BlogContext.Provider value={value}>
      {props.children}
    </BlogContext.Provider>
  )
}

export default BlogContextProvider;