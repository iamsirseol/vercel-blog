import { useRef, useState } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'

export default function Write() {
  const idRef = useRef()
  const titleRef = useRef()
  const contentRef = useRef()

  const [showLink, setShowLink] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const id = idRef.current.value
    const title = titleRef.current.value
    const content = contentRef.current.value

    if (id && title && content) {
      fetch('/api/post/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          title,
          content,
        }),
      })
        .then((res) => {
          console.log(res)
          if (res.ok) {
            setShowLink(true)
            return res.json()
          }
          throw new Error('Fetch Error')
        })
        .then((data) => alert(data.message))
        .catch((error) => alert(`request error: ${error}`))
    }
  }

  return (
    <Layout>
      <h1>Write a post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="id" required ref={idRef} />
        <br />
        <input
          type="text"
          name="title"
          placeholder="title"
          required
          ref={titleRef}
        />
        <br />
        <textarea
          type="text"
          name="content"
          placeholder="content"
          required
          ref={contentRef}
        />
        <br />
        <input type="submit" value="Create" />
      </form>
      {showLink && (
        <Link href={`/posts/${idRef.current?.value}`}>Create post</Link>
      )}
    </Layout>
  )
}
