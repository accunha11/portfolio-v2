/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true"
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? ""
const isUserOrOrgPage = repoName.endsWith(".github.io")
const basePath =
  isGithubActions && !isUserOrOrgPage && repoName ? `/${repoName}` : ""

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
}

export default nextConfig
