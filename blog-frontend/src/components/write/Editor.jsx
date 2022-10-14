import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import palette from '../../lib/palette'
import Responsive from '../common/Responsive'
import Quill from 'quill'
import 'quill/dist/quill.bubble.css'

// 페이지 여백
const EditorBlock = styled(Responsive)`
  padding-top: 5rem;
  padding-bottom: 5rem;
`
const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`
const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 0px;
  }
`

const Editor = () => {
  const quillElement = useRef(null) //Quill DivElement
  const quillInstance = useRef(null) //Quill instance

  useEffect(() => {
    // new Quill(DOM, { theme, placeholder, modules(.toolbar) });
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      placeholder: '내용을 입력하세요.',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image']
        ]
      }
    })
  }, [])
  return (
    <EditorBlock>
      <TitleInput placeholder='제목을 입력하세요' />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  )
}

export default Editor
