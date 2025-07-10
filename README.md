# GitHub Mirror Information

**⚠️ This is a read-only mirror repository**

The primary repository for these scripts is hosted on Google Earth Engine:
- **Primary Repository:** https://earthengine.googlesource.com/users/stormwaterheatmap/apps/
- **GitHub Mirror:** https://github.com/stormwaterheatmap/earth-engine.git

All development work should be done on the primary Google Earth Engine repository. This GitHub repository is automatically synchronized and should not receive direct commits.

## For Stormwater Heatmap Developers

### Initial Setup
Clone the primary repository:
```bash
git clone https://earthengine.googlesource.com/users/stormwaterheatmap/apps
cd apps
```

### Daily Development Workflow
Pull latest changes from the primary repository:
```bash
git pull origin
```

Push changes to the primary repository:
```bash
git push origin
```

### Mirroring to GitHub
After pushing changes to the primary repository, update the GitHub mirror:
```bash
# Add GitHub remote (one-time setup)
git remote add github https://github.com/stormwaterheatmap/earth-engine.git

# Push all branches and tags to GitHub mirror
git push github --all
git push github --tags
```

### Alternative: Complete Mirror Sync
To perform a complete mirror synchronization (overwrites GitHub with exact state of primary repo):
```bash
git push --mirror https://github.com/stormwaterheatmap/earth-engine.git
```

## Important Notes

- **DO NOT** create pull requests or push directly to this GitHub repository
- **DO NOT** use GitHub Issues - report issues through the primary repository or team channels
- All development, code reviews, and collaboration should happen on the Google Earth Engine repository
- This mirror exists for visibility, backup, and integration with external tools that require GitHub access

For questions about repository access or Earth Engine development, contact the team administrators.
