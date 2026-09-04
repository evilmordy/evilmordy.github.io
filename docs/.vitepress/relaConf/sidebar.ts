import { DefaultTheme } from "vitepress";
import fs from "fs";
import path from "path"
import { compareByDateDesc, parseNoteDate } from "../data/noteDate";

function readNoteDate(filePath: string, fileName: string): string | undefined {
    try {
        return parseNoteDate(fs.readFileSync(filePath, "utf8"), fileName)
    } catch {
        return undefined
    }
}

function scanDir(dirPath: string, linkPrefix: string): DefaultTheme.SidebarItem[] {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const items: DefaultTheme.SidebarItem[] = [];

    const mdFiles = entries
        .filter((e) => e.isFile() && e.name.endsWith(".md") && e.name !== "index.md");
    const fileItems = mdFiles.map((file) => {
        const name = file.name.replace(/\.md$/, "");
        const date = readNoteDate(path.join(dirPath, file.name), file.name)
        return {
            text: date ? `${date} · ${name}` : name,
            link: `${linkPrefix}/${name}`,
            date,
        }
    })
    if (fileItems.some((item) => item.date)) {
        fileItems.sort(compareByDateDesc)
    }
    for (const item of fileItems) {
        items.push({ text: item.text, link: item.link })
    }

    const subDirs = entries.filter((e) => e.isDirectory());
    for (const dir of subDirs) {
        const subDirPath = path.join(dirPath, dir.name);
        const subLinkPrefix = `${linkPrefix}/${dir.name}`;
        const subItems = scanDir(subDirPath, subLinkPrefix);
        if (subItems.length === 0) continue;
        const hasIndex = fs.existsSync(path.join(subDirPath, "index.md"));
        items.push({
            text: dir.name,
            link: hasIndex ? `${subLinkPrefix}/` : undefined,
            collapsed: true,
            items: subItems,
        });
    }

    return items;
}

export function autoSidebar():DefaultTheme.Sidebar{
    const noteDir = path.resolve(process.cwd(),"docs/notes")
    const dirEntries = fs.readdirSync(noteDir,{withFileTypes:true})

    const groups:DefaultTheme.SidebarItem[]=[]

    for(const entry of dirEntries){
        if(!entry.isDirectory()) continue

        const categoryDir = path.join(noteDir,entry.name)
        const items = scanDir(categoryDir, `/notes/${entry.name}`)

        const hasIndex = fs.existsSync(path.join(categoryDir, "index.md"))
        const group: DefaultTheme.SidebarItem = {
          text: entry.name,
          link: hasIndex ? `/notes/${entry.name}/` : undefined,
          collapsed: false,
          items,
        }
        groups.push(group)
    }
    return { "/notes/": groups } satisfies DefaultTheme.Sidebar

}

export const sidebar: DefaultTheme.Sidebar=autoSidebar()