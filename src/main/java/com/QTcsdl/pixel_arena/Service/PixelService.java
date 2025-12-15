package com.QTcsdl.pixel_arena.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.QTcsdl.pixel_arena.Model.Pixel;
import com.QTcsdl.pixel_arena.Model.PixelId;
import com.QTcsdl.pixel_arena.Repository.PixelRepository;
import com.QTcsdl.pixel_arena.dto.PixelRequest;

@Service
public class PixelService {

    @Autowired
    private PixelRepository pixelRepository;

    // Giả lập độ trễ xử lý (3 giây) để con người kịp nhìn thấy lỗi
    private void simulateProcessingDelay() {
        try {
            Thread.sleep(3000); 
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    //CÁCH 1: KHÔNG KHÓA (Gây lỗi Race Condition)
    public Pixel paintNoLock(PixelRequest request) {
        //Đọc dữ liệu lên
        Pixel pixel = pixelRepository.findById(new PixelId(request.getX(), request.getY()))
                .orElseThrow(() -> new RuntimeException("Pixel not found"));

        //NGỦ 3 GIÂY (Trong lúc này, người khác cũng đọc được dữ liệu cũ)
        simulateProcessingDelay();

        //Ghi đè dữ liệu mới
        pixel.setColor(request.getColor());
        pixel.setUpdatedBy(request.getUpdatedBy());
        return pixelRepository.save(pixel);
    }

    //CÁCH 2: KHÓA BI QUAN (Pessimistic Lock - An toàn tuyệt đối)
    @Transactional // Bắt buộc phải có Transaction khi dùng Lock
    public Pixel paintPessimistic(PixelRequest request) {
        //Đọc và KHÓA ngay lập tức. Người đến sau phải đứng chờ ở dòng này.
        Pixel pixel = pixelRepository.findPixelForUpdate(request.getX(), request.getY())
                .orElseThrow(() -> new RuntimeException("Pixel not found"));

        //Vẫn ngủ 3 giây (để chứng minh người sau phải chờ đủ 3s mới được chạy)
        simulateProcessingDelay();

        //Ghi dữ liệu
        pixel.setColor(request.getColor());
        pixel.setUpdatedBy(request.getUpdatedBy());
        return pixelRepository.save(pixel);
    }

    //CÁCH 3: KHÓA LẠC QUAN (Optimistic Lock - Nhanh nhưng kén chọn)
    public Pixel paintOptimistic(PixelRequest request) {
        //Đọc dữ liệu (kèm version)
        Pixel pixel = pixelRepository.findById(new PixelId(request.getX(), request.getY()))
                .orElseThrow(() -> new RuntimeException("Pixel not found"));

        //Ngủ 3 giây
        simulateProcessingDelay();

        //Ghi dữ liệu
        // Nếu version trong DB khác version lúc đọc -> Spring tự ném lỗi ObjectOptimisticLockingFailureException
        pixel.setColor(request.getColor());
        pixel.setUpdatedBy(request.getUpdatedBy());
        return pixelRepository.save(pixel);
    }
}
