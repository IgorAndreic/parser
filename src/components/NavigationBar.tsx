function NavbarLink({link, title}) {
  return (
    <a id={title} href={`${link}`}
      className="p-1">
      {title}
    </a>
  )
}

interface __Link__ {
  title: string,
  link: string,
}

export default function NavigationBar() {
  const links: __Link__[] = [
    {title: "Продукты", link: "/product"},
    {title: "Цены на продукты", link: "/product_price"},
    {title: "Парсеры", link: "/parse_task"},
    {title: "Задачи парсеров", link: "/parse_settings"},
  ]

  return (
    <div id="nav-bar" className="flex flex-col p-4">
      { links.map((link, id) => <NavbarLink key={id} link={link.link} title={link.title} />) }
    </div>
  )
}