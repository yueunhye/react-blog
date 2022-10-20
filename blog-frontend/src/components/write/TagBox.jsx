import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import palette from '../../lib/palette'

const TagBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[2]};
  padding-top: 2rem;

  h4 {
    color: ${palette.gray[8]};
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`
const TagForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  width: 256px;
  border: 1px solid ${palette.gray[9]};
  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }
  input {
    padding: 0.5rem;
    flex: 1;
    min-width: 0;
  }
  button {
    cursor: pointer;
    padding-right: 1rem;
    padding-left: 1rem;
    border: none;
    background: ${palette.gray[8]};
    color: white;
    font-weight: bold;
    &:hover {
      background: ${palette.gray[6]};
    }
  }
`
const Tag = styled.div`
  margin-right: 0.5rem;
  color: ${palette.gray[6]};
  cursor: pointer;
  &:hover {
    opacity: 0.5s;
  }
`
const TagListBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
`
//TagBox내부에서 TagItem, TagList 컴포넌트 분리 후 React.memo를 사용하여 최적화
//props가 바뀌지 않는다면 리렌더링 되지 않음
const TagItem = React.memo(({ tag, onRemove }) => (
  <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
))
const TagList = React.memo(({ tags, onRemove }) => (
  <TagListBlock>
    {tags.map(tag => (
      <TagItem onRemove={onRemove} key={tag} tag={tag} />
    ))}
  </TagListBlock>
))

const TagBox = ({ onChangeTags, tags }) => {
  const [input, setInput] = useState('')
  const [localTags, setLocalTags] = useState([])
  const insertTag = useCallback(
    tag => {
      if (!tag) return
      if (localTags.includes(tag)) return
      const nextTags = [...localTags, tag]
      setLocalTags(nextTags)
      onChangeTags(nextTags)
    },
    [localTags, onChangeTags]
  )
  const onRemove = useCallback(
    tag => {
      const nextTags = localTags.filter(t => t !== tag)
      setLocalTags(nextTags)
      onChangeTags(nextTags)
    },
    [localTags, onChangeTags]
  )
  const onChange = useCallback(e => {
    setInput(e.target.value)
  }, [])
  const onSubmit = useCallback(
    e => {
      e.preventDefault()
      insertTag(input.trim()) //앞뒤 공백 제거
      setInput('') //초기화
    },
    [input, insertTag]
  )
  useEffect(() => {
    setLocalTags(tags)
  }, [tags])
  return (
    <TagBoxBlock>
      <h4>태그</h4>
      <TagForm onSubmit={onSubmit}>
        <input
          placeholder='태그를 입력하세요'
          value={input}
          onChange={onChange}
        />
        <button type='submit'>추가</button>
      </TagForm>
      <TagList tags={localTags} onRemove={onRemove} />
    </TagBoxBlock>
  )
}

export default TagBox