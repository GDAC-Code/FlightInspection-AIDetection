import torch

# 检查 PyTorch 版本
print(torch.__version__)

# 检查 CUDA 是否可用
print(torch.cuda.is_available())

# 查看可用的 CUDA 数量
print(torch.cuda.device_count())

# 查看 CUDA 的版本号
print(torch.version.cuda)