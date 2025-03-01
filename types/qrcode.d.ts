declare module 'qrcode' {
  export interface QRCodeOptions {
    version?: number
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
    type?: 'image/png' | 'image/jpeg' | 'image/webp' | 'svg'
    quality?: number
    margin?: number
    color?: {
      dark?: string
      light?: string
    }
    width?: number
    scale?: number
  }

  export function toDataURL(
    text: string,
    options?: QRCodeOptions
  ): Promise<string>

  export function toString(
    text: string,
    options?: QRCodeOptions & { type?: 'svg' | 'utf8' | 'terminal' }
  ): Promise<string>

  export function toFile(
    path: string,
    text: string,
    options?: QRCodeOptions
  ): Promise<void>

  export function toFileStream(
    stream: NodeJS.WritableStream,
    text: string,
    options?: QRCodeOptions
  ): Promise<void>

  export function toBuffer(
    text: string,
    options?: QRCodeOptions
  ): Promise<Buffer>

  export function toCanvas(
    canvas: HTMLCanvasElement,
    text: string,
    options?: QRCodeOptions
  ): Promise<HTMLCanvasElement>
}