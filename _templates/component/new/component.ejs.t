---
to: "src/<%= path ? `features/${path}/components` : `components` %>/<%= name %>/<%= name %>.tsx"
---
interface <%= name %>Props {}

export const <%= name %> = ({  }: <%= name %>Props) => {
  return (
    <>
    </>
  )
}
