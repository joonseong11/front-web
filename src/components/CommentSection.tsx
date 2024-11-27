'use client'

import Image from 'next/image'
import IcMoreIcon from '@/assets/icon_more.svg'
import { useRef, useState } from 'react'

const CommentSection = ({ eventId }: { eventId: string }) => {
  return (
    <article>
      <h2 className="text-2xl font-semibold">댓글</h2>
      <div className="mt-2 flex items-center gap-2 p-2">
        <Image src="/images/profile.png" alt="profile" width={24} height={24} />
        <p className="text-xl">야채비빔밥</p>
        <p className="text-green">본인</p>
      </div>
      <CommentInput />
      <div className="my-8 border border-gray-300" />
      <CommentList />
    </article>
  )
}

export default CommentSection

const CommentInput = () => {
  const [isFocus, setIsFocus] = useState(false)
  const [comment, setComment] = useState('')
  const isExceeded = comment.length >= 250

  return (
    <section>
      <textarea
        placeholder="댓글을 입력하세요"
        className={`w-full resize-none rounded-xl border border-gray-300 p-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isFocus ? 'h-20 border-green' : 'h-12'}`}
        onFocus={() => {
          setIsFocus(true)
        }}
        onBlur={() => {
          setIsFocus(false)
        }}
        value={comment}
        onChange={(e) =>
          e.target.value.length <= 250 && setComment(e.target.value)
        }
      />
      {isFocus && (
        <section className="flex items-center justify-between gap-2">
          <p
            className={`transition-colors ${isExceeded ? 'text-red-500' : 'text-gray-500'}`}
          >
            {comment.length}/250
          </p>
          <button
            type="submit"
            className="mt-1 rounded-md bg-green px-6 py-2 text-white"
          >
            등록
          </button>
        </section>
      )}
    </section>
  )
}

const CommentList = () => {
  return (
    <div>
      <CommentContainer
        isReply={true}
        replyListRepresent={true}
        replyCount={10}
      />
    </div>
  )
}

const CommentContainer = ({
  isReply,
  replyListRepresent,
  replyCount,
}: {
  isReply: boolean
  replyListRepresent: boolean
  replyCount: number
}) => {
  return (
    <section>
      <CommentItem />
      {isReply && (
        <details className="mt-4 [&>summary]:list-none">
          <summary
            className={`cursor-pointer hover:underline ${replyListRepresent ? 'text-gray-900' : 'text-green'}`}
          >
            {`답글${replyListRepresent ? '보기' : '달기'}(${replyCount})`}
          </summary>
          <div className='ml-10 mt-4 gap-1 flex flex-col'>
            <CommentItem />
            <CommentItem />
            <CommentInput/>
          </div>
        </details>
      )}
    </section>
  )
}

const CommentItem = () => {
  return (
    <>
      <section className="flex items-center justify-between gap-2 p-2">
        <section className="flex items-center gap-2">
          <Image
            src="/images/profile.png"
            alt="profile"
            width={24}
            height={24}
          />
          <p className="text-xl">야채비빔밥</p>
          <p className="text-green">본인</p>
        </section>
        <button>
          <IcMoreIcon />
        </button>
      </section>
      <p className="p-2">
        안녕하세요 댓글 작성 테스트 중입니다. 댓글 작성 테스트 중입니다. 댓글
        작성 테스트 중입니다. 댓글 작성 테스트 중입니다. 댓글 작성 테스트
        중입니다.
      </p>
    </>
  )
}
