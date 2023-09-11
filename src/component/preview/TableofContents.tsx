import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'

type ContentChild = {
  id: string
  title: string
}

type Content = {
  id: string
  title: string
  items: ContentChild[]
}

const Headings = ({ headings, activeId }: { headings: Content[]; activeId: string }) => {
  // headings.forEach((heading) => {
  //   console.log(document.querySelector(`#${heading.id}`))
  // })
  return (
    <div className="text-sm whitespace-nowrap ">
      <ul>
        {headings.map((heading) => (
          <li key={heading.id} className={heading.id === activeId ? 'text-brightGold' : ''}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector(`#${heading.id}`)!.scrollIntoView({
                  behavior: 'smooth',
                })
                // document.querySelector(`#${heading.id}`)!.scrollTop = -20
              }}>
              {heading.title}
            </a>
            {heading.items.length > 0 && (
              <ul>
                {heading.items.map((child) => (
                  <li key={child.id} className={child.id === activeId ? 'text-brightGold' : ''}>
                    {' '}
                    <a
                      href={`#${child.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        document.querySelector(`#${child.id}`)!.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        })
                        // window.scrollBy(0, -340)
                        // document.querySelector(`#${child.id}`)!.scrollTop = -40
                      }}>
                      {child.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

/*

- Dynamically generates the table of contents list, using any H2s and H3s it can find in the main text
*/
type ElementWithInnerText = Element & { innerText: string }
const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState<Content[]>([])
  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h1, h2'))
    // Created a list of headings, with H3s nested
    const newNestedHeadings = getNestedHeadings(headingElements as ElementWithInnerText[])
    setNestedHeadings(newNestedHeadings)
  }, [])
  return { nestedHeadings }
}
const getNestedHeadings = (headingElements: ElementWithInnerText[]) => {
  const nestedHeadings: Content[] = []
  headingElements.forEach((heading) => {
    const { innerText, id } = heading
    if (heading.nodeName === 'H1') {
      nestedHeadings.push({ id, title: innerText, items: [] })
    } else if (heading.nodeName === 'H2' && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title: innerText,
      })
    }
  })
  return nestedHeadings
}
const useIntersectionObserver = (setActiveId: Dispatch<SetStateAction<string>>) => {
  // type HeadingRef = Record<string, IntersectionObserverEntry>
  const headingElementsRef: MutableRefObject<Record<string, IntersectionObserverEntry>> = useRef({})
  useEffect(() => {
    const callback = (headings: IntersectionObserverEntry[]) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        return { ...map, [headingElement.target.id]: headingElement }
      }, headingElementsRef.current)
      const visibleHeadings: IntersectionObserverEntry[] = []
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key]
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
      })
      const getIndexFromId = (id: string) =>
        headingElements.findIndex((heading) => heading.id === id)

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id)
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort((a, b) => {
          if (getIndexFromId(a.target.id) > getIndexFromId(b.target.id)) {
            return 1
          }
          return 0
        })
        setActiveId(sortedVisibleHeadings[0].target.id)
      }
    }
    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px 20% 0px',
    })

    const headingElements = Array.from(document.querySelectorAll('h1'))

    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [setActiveId])
}
/*
- Renders the table of contents.
  */
const TableOfContents = () => {
  const [activeId, setActiveId] = useState<string>('')
  const { nestedHeadings } = useHeadingsData()
  useIntersectionObserver(setActiveId)

  return (
    <nav aria-label="Table of contents" className="sticky h-1 translate-y-4 top-20 ">
      <Headings headings={nestedHeadings} activeId={activeId} />
    </nav>
  )
}
export default TableOfContents
