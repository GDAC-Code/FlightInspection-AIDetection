模型训练评估与推理
- 运行```splitDataset.py``` 划分数据集
- 运行 ```xml2txt.py```  训练的标注文件
- 运行 ```ViewCategory.py``` 类别
- 填写 ```mydata.yaml``` 数据配置文件
xml2txt.py和mydata.yaml中的类别名称的顺序要一致

### 模型训练
通过调用```train.py```文件进行模型训练，```epochs```参数用于调整训练的轮数，代码如下:
```python 
from ultralytics import YOLO  
if __name__ == "__main__":  
    # build from YAML and transfer weights  
    model = YOLO('yolov8n.yaml').load('./weights/yolov8n.pt')  
    # Train the model  
    model.train(data='./VOCData/mydata.yaml', epochs=100, imgsz=640)
```

### 训练结果
训练结束后再```run/```目录下找到结果模型

### 模型推理
模型训练完成会得到一个```best.pt``` 文件 在```run/trian/weights``` 目录下，可使用该文件进行推理检测
代码如下:
```python
from ultralytics import YOLO  
  
if __name__ == "__main__":  
    # Load a model  
    model = YOLO('./runs/detect/train/weights/best.pt')
```
