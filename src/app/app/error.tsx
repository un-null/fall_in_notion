'use client'

export const Error = ({ error }: { error: Error }) => {
  return (
    <div>
      <p className="mt-6 text-center text-red-500">
        Data fetching in server failed
      </p>
      <p className="mt-6 text-center text-red-500">
        {error.name}:{error.message}
      </p>
    </div>
  )
}

export default Error
