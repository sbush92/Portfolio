import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type BlogPost = {
  id?: number | string;
  title?: string | null;
  content?: string | null;
};

const POSTS_PER_PAGE = 6;
const BLOG_API_ENDPOINT = import.meta.env.VITE_BLOG_API_ENDPOINT ?? "/api/blog";

const Blog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const parsedPage = Number(searchParams.get("page") ?? "1");
  const requestedPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const totalPages = Math.max(1, Math.ceil(blogPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(requestedPage, totalPages);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const visiblePosts = blogPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  useEffect(() => {
    let isActive = true;

    async function loadPosts() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(BLOG_API_ENDPOINT);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = (await response.json()) as BlogPost[];

        if (isActive) {
          setBlogPosts(Array.isArray(data) ? data : []);
        }
      } catch (fetchError) {
        if (isActive) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Unable to load blog posts.",
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    void loadPosts();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (requestedPage === currentPage) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);

    if (currentPage <= 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(currentPage));
    }

    setSearchParams(nextParams, { replace: true });
  }, [currentPage, requestedPage, searchParams, setSearchParams]);

  function handlePageChange(pageNumber: number) {
    const nextParams = new URLSearchParams(searchParams);

    if (pageNumber <= 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(pageNumber));
    }

    setSearchParams(nextParams);
  }

  return (
    <main id="blog" className="bg-overlay">
      <h1 className="lg-heading">
        Tech<span className="text-secondary">Blog</span>
      </h1>
      <h2 className="sm-heading">
        Greetings tech enthusiasts, learners, and fellow explorers!
      </h2>

      {loading ? (
        <p className="blog-status">Loading blog posts...</p>
      ) : error ? (
        <p className="blog-status blog-status-error">Error loading blog posts: {error}</p>
      ) : visiblePosts.length === 0 ? (
        <p className="blog-status">No blog posts are available yet.</p>
      ) : (
        <>
          <section id="blog-posts" className="blog-posts">
            {visiblePosts.map((post, index) => {
              const postKey = post.id ?? `${currentPage}-${index}`;

              return (
                <article key={postKey} className="post">
                  <h5>{post.title ?? "Untitled Post"}</h5>
                  <p>{post.content ?? ""}</p>
                </article>
              );
            })}
          </section>

          <nav className="pagination" aria-label="Blog pages">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;

              return (
                <button
                  key={pageNumber}
                  type="button"
                  className={pageNumber === currentPage ? "is-active" : undefined}
                  aria-current={pageNumber === currentPage ? "page" : undefined}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}
          </nav>
        </>
      )}
    </main>
  );
};

export default Blog;
