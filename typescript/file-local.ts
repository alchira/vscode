import { t_Metadata, t_ManifestLocals, t_TagRange, t_TrackRange, } from './types';
import { ExtensionManager } from './activate';
import { metadataFormat } from './helpers/metadata';

export class FILELOCAL {
    private Server: ExtensionManager;
    manifest: t_ManifestLocals;

    watchingAttributes: string[] = [];
    tagranges: t_TagRange[] = [];
    attachables: Record<string, t_Metadata> = {};
    assignables: Record<string, t_Metadata> = {};

    constructor(core: ExtensionManager) {
        this.Server = core;
        this.manifest = {
            hashes: [],
            assignable: [],
            attachable: [],
            symlinks: {},
        };
        this.updateManifest();
    }

    RangeFilter(watching = true, comments = true, compose = true): t_TrackRange[] {
        const acc: t_TrackRange[] = [];
        for (const I of this.tagranges) {
            if (watching) {
                for (const i of I.cache.watchingRanges) { acc.push(i); }
            }
            if (comments) {
                for (const i of I.cache.commentsRanges) { acc.push(i); }
            }
            if (compose) {
                for (const i of I.cache.composerRanges) { acc.push(i); }
            }
        }
        return acc;
    }

    getTagRanges() {
        return this.tagranges || [];
    }

    getMetadata(symlink: string) {
        return this.manifest.symlinks[symlink] || this.Server.Global.symlinks[symlink];
    }

    getMarkdown(symlink: string) {
        let h = symlink + ":";
        const metadata = this.getMetadata(symlink);

        if (!metadata) {
            return "";
        } else if (!metadata.markdown) {
            const mods: string[] = [];
            if (this.manifest.assignable.includes(symlink)) { mods.push(" Assignable "); }
            if (this.manifest.attachable.includes(symlink)) { mods.push(" Attachable "); }
            h += mods.join("&");
            metadata.markdown = metadataFormat(h, metadata);
        }

        return metadata.markdown;
    }


    updateManifest(manifest: t_ManifestLocals = this.manifest) {
        this.manifest = manifest;

        const l = this.manifest.symlinks;
        const g = this.Server.Global.symlinks;

        const as: Record<string, t_Metadata> = {};
        const at: Record<string, t_Metadata> = {};
        for (const a of this.manifest.assignable) { as[a] = l[a] || g[a]; }
        for (const a of this.manifest.attachable) { at[a] = l[a] || g[a]; }
        this.assignables = as;
        this.attachables = at;

        for (const s of Object.keys(manifest.symlinks)) {
            if (this.Server.Global.symlinks[s]) {
                this.Server.Global.symlinks[s] = manifest.symlinks[s];
            }
        }
    }

    findSymlink(symlink: string) {
        return this.Server.Global.symlinks[symlink] || this.manifest.symlinks?.[symlink];
    }
}