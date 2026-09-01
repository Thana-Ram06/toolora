---
name: GitHub connector write limits
description: Environment-specific behavior encountered when pushing a repository through the connected GitHub integration.
---

GitHub connector reads and small Contents writes can work while repeated Git database mutations or large tree payloads are blocked by a Cloudflare HTML response from the connector layer.

**Why:** Repeated blob/tree writes were throttled even though the GitHub connection had push permission and healthy primary API quota.

**How to apply:** Verify the remote branch and recursive file count after every external-repository upload; never report a complete push based only on a successful partial write.