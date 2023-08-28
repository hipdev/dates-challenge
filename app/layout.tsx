import '@/styles/globals.css'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <title>Clients dates demo</title>
      </head>
      <body className='bg-slate-800'>{children}</body>
    </html>
  )
}
