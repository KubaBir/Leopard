interface CameraViewProps {
  address: string
}

export const CameraView = ({ address }: CameraViewProps): JSX.Element => {
  return (
    <div className="absolute inset-0 ">
      <img
        src={`http://${address}:81/stream`}
        className="w-full h-full z-0"
        crossOrigin=""
        alt=""
      />
    </div>
  )
}
