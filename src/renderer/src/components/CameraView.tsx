interface CameraViewProps {
  address: string
  classes?: string
}

export const CameraView = ({ address, classes }: CameraViewProps): JSX.Element => {
  return (
    <div className="absolute inset-0 ">
      <img
        src={`http://${address}:81/stream`}
        className={'w-full h-full z-0 ' + classes}
        crossOrigin=""
        alt=""
      />
    </div>
  )
}
