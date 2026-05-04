#!/usr/bin/env python3

import os
import subprocess


def main():
    # 当前工作目录
    cwd = os.getcwd()

    # 只取最后一级文件夹名
    project_name = os.path.basename(os.path.normpath(cwd))

    message = f"Codex in {project_name} has completed its work."

    subprocess.run(
        [
            "say",
            "-v",
            "Moira",  # 改成你喜欢的声音
            "-r",
            "170",  # 稍微慢一点更自然
            message,
        ],
        check=False,
    )


if __name__ == "__main__":
    main()
