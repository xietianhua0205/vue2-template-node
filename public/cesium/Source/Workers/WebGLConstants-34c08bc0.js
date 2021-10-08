/* This file is automatically rebuilt by the Cesium build process. */
define(['exports'], function (exports) { 'use strict';

  /**
   * Enum containing WebGL Constant values by name.
   * for use without an active WebGL context, or in cases where certain constants are unavailable using the WebGL context
   * (For example, in [Safari 9]{@link https://github.com/CesiumGS/cesium/issues/2989}).
   *
   * These match the constants from the [WebGL 1.0]{@link https://www.khronos.org/registry/webgl/specs/latest/1.0/}
   * and [WebGL 2.0]{@link https://www.khronos.org/registry/webgl/specs/latest/2.0/}
   * specifications.
   *
   * @enum {Number}
   */
  var WebGLConstants = {
    DEPTH_BUFFER_BIT: 0x00000100,
    STENCIL_BUFFER_BIT: 0x00000400,
    COLOR_BUFFER_BIT: 0x00004000,
    POINTS: 0x0000,
    LINES: 0x0001,
    LINE_LOOP: 0x0002,
    LINE_STRIP: 0x0003,
    TRIANGLES: 0x0004,
    TRIANGLE_STRIP: 0x0005,
    TRIANGLE_FAN: 0x0006,
    ZERO: 0,
    ONE: 1,
    SRC_COLOR: 0x0300,
    ONE_MINUS_SRC_COLOR: 0x0301,
    SRC_ALPHA: 0x0302,
    ONE_MINUS_SRC_ALPHA: 0x0303,
    DST_ALPHA: 0x0304,
    ONE_MINUS_DST_ALPHA: 0x0305,
    DST_COLOR: 0x0306,
    ONE_MINUS_DST_COLOR: 0x0307,
    SRC_ALPHA_SATURATE: 0x0308,
    FUNC_ADD: 0x8006,
    BLEND_EQUATION: 0x8009,
    BLEND_EQUATION_RGB: 0x8009, // same as BLEND_EQUATION
    BLEND_EQUATION_ALPHA: 0x883d,
    FUNC_SUBTRACT: 0x800a,
    FUNC_REVERSE_SUBTRACT: 0x800b,
    BLEND_DST_RGB: 0x80c8,
    BLEND_SRC_RGB: 0x80c9,
    BLEND_DST_ALPHA: 0x80ca,
    BLEND_SRC_ALPHA: 0x80cb,
    CONSTANT_COLOR: 0x8001,
    ONE_MINUS_CONSTANT_COLOR: 0x8002,
    CONSTANT_ALPHA: 0x8003,
    ONE_MINUS_CONSTANT_ALPHA: 0x8004,
    BLEND_COLOR: 0x8005,
    ARRAY_BUFFER: 0x8892,
    ELEMENT_ARRAY_BUFFER: 0x8893,
    ARRAY_BUFFER_BINDING: 0x8894,
    ELEMENT_ARRAY_BUFFER_BINDING: 0x8895,
    STREAM_DRAW: 0x88e0,
    STATIC_DRAW: 0x88e4,
    DYNAMIC_DRAW: 0x88e8,
    BUFFER_SIZE: 0x8764,
    BUFFER_USAGE: 0x8765,
    CURRENT_VERTEX_ATTRIB: 0x8626,
    FRONT: 0x0404,
    BACK: 0x0405,
    FRONT_AND_BACK: 0x0408,
    CULL_FACE: 0x0b44,
    BLEND: 0x0be2,
    DITHER: 0x0bd0,
    STENCIL_TEST: 0x0b90,
    DEPTH_TEST: 0x0b71,
    SCISSOR_TEST: 0x0c11,
    POLYGON_OFFSET_FILL: 0x8037,
    SAMPLE_ALPHA_TO_COVERAGE: 0x809e,
    SAMPLE_COVERAGE: 0x80a0,
    NO_ERROR: 0,
    INVALID_ENUM: 0x0500,
    INVALID_VALUE: 0x0501,
    INVALID_OPERATION: 0x0502,
    OUT_OF_MEMORY: 0x0505,
    CW: 0x0900,
    CCW: 0x0901,
    LINE_WIDTH: 0x0b21,
    ALIASED_POINT_SIZE_RANGE: 0x846d,
    ALIASED_LINE_WIDTH_RANGE: 0x846e,
    CULL_FACE_MODE: 0x0b45,
    FRONT_FACE: 0x0b46,
    DEPTH_RANGE: 0x0b70,
    DEPTH_WRITEMASK: 0x0b72,
    DEPTH_CLEAR_VALUE: 0x0b73,
    DEPTH_FUNC: 0x0b74,
    STENCIL_CLEAR_VALUE: 0x0b91,
    STENCIL_FUNC: 0x0b92,
    STENCIL_FAIL: 0x0b94,
    STENCIL_PASS_DEPTH_FAIL: 0x0b95,
    STENCIL_PASS_DEPTH_PASS: 0x0b96,
    STENCIL_REF: 0x0b97,
    STENCIL_VALUE_MASK: 0x0b93,
    STENCIL_WRITEMASK: 0x0b98,
    STENCIL_BACK_FUNC: 0x8800,
    STENCIL_BACK_FAIL: 0x8801,
    STENCIL_BACK_PASS_DEPTH_FAIL: 0x8802,
    STENCIL_BACK_PASS_DEPTH_PASS: 0x8803,
    STENCIL_BACK_REF: 0x8ca3,
    STENCIL_BACK_VALUE_MASK: 0x8ca4,
    STENCIL_BACK_WRITEMASK: 0x8ca5,
    VIEWPORT: 0x0ba2,
    SCISSOR_BOX: 0x0c10,
    COLOR_CLEAR_VALUE: 0x0c22,
    COLOR_WRITEMASK: 0x0c23,
    UNPACK_ALIGNMENT: 0x0cf5,
    PACK_ALIGNMENT: 0x0d05,
    MAX_TEXTURE_SIZE: 0x0d33,
    MAX_VIEWPORT_DIMS: 0x0d3a,
    SUBPIXEL_BITS: 0x0d50,
    RED_BITS: 0x0d52,
    GREEN_BITS: 0x0d53,
    BLUE_BITS: 0x0d54,
    ALPHA_BITS: 0x0d55,
    DEPTH_BITS: 0x0d56,
    STENCIL_BITS: 0x0d57,
    POLYGON_OFFSET_UNITS: 0x2a00,
    POLYGON_OFFSET_FACTOR: 0x8038,
    TEXTURE_BINDING_2D: 0x8069,
    SAMPLE_BUFFERS: 0x80a8,
    SAMPLES: 0x80a9,
    SAMPLE_COVERAGE_VALUE: 0x80aa,
    SAMPLE_COVERAGE_INVERT: 0x80ab,
    COMPRESSED_TEXTURE_FORMATS: 0x86a3,
    DONT_CARE: 0x1100,
    FASTEST: 0x1101,
    NICEST: 0x1102,
    GENERATE_MIPMAP_HINT: 0x8192,
    BYTE: 0x1400,
    UNSIGNED_BYTE: 0x1401,
    SHORT: 0x1402,
    UNSIGNED_SHORT: 0x1403,
    INT: 0x1404,
    UNSIGNED_INT: 0x1405,
    FLOAT: 0x1406,
    DEPTH_COMPONENT: 0x1902,
    ALPHA: 0x1906,
    RGB: 0x1907,
    RGBA: 0x1908,
    LUMINANCE: 0x1909,
    LUMINANCE_ALPHA: 0x190a,
    UNSIGNED_SHORT_4_4_4_4: 0x8033,
    UNSIGNED_SHORT_5_5_5_1: 0x8034,
    UNSIGNED_SHORT_5_6_5: 0x8363,
    FRAGMENT_SHADER: 0x8b30,
    VERTEX_SHADER: 0x8b31,
    MAX_VERTEX_ATTRIBS: 0x8869,
    MAX_VERTEX_UNIFORM_VECTORS: 0x8dfb,
    MAX_VARYING_VECTORS: 0x8dfc,
    MAX_COMBINED_TEXTURE_IMAGE_UNITS: 0x8b4d,
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: 0x8b4c,
    MAX_TEXTURE_IMAGE_UNITS: 0x8872,
    MAX_FRAGMENT_UNIFORM_VECTORS: 0x8dfd,
    SHADER_TYPE: 0x8b4f,
    DELETE_STATUS: 0x8b80,
    LINK_STATUS: 0x8b82,
    VALIDATE_STATUS: 0x8b83,
    ATTACHED_SHADERS: 0x8b85,
    ACTIVE_UNIFORMS: 0x8b86,
    ACTIVE_ATTRIBUTES: 0x8b89,
    SHADING_LANGUAGE_VERSION: 0x8b8c,
    CURRENT_PROGRAM: 0x8b8d,
    NEVER: 0x0200,
    LESS: 0x0201,
    EQUAL: 0x0202,
    LEQUAL: 0x0203,
    GREATER: 0x0204,
    NOTEQUAL: 0x0205,
    GEQUAL: 0x0206,
    ALWAYS: 0x0207,
    KEEP: 0x1e00,
    REPLACE: 0x1e01,
    INCR: 0x1e02,
    DECR: 0x1e03,
    INVERT: 0x150a,
    INCR_WRAP: 0x8507,
    DECR_WRAP: 0x8508,
    VENDOR: 0x1f00,
    RENDERER: 0x1f01,
    VERSION: 0x1f02,
    NEAREST: 0x2600,
    LINEAR: 0x2601,
    NEAREST_MIPMAP_NEAREST: 0x2700,
    LINEAR_MIPMAP_NEAREST: 0x2701,
    NEAREST_MIPMAP_LINEAR: 0x2702,
    LINEAR_MIPMAP_LINEAR: 0x2703,
    TEXTURE_MAG_FILTER: 0x2800,
    TEXTURE_MIN_FILTER: 0x2801,
    TEXTURE_WRAP_S: 0x2802,
    TEXTURE_WRAP_T: 0x2803,
    TEXTURE_2D: 0x0de1,
    TEXTURE: 0x1702,
    TEXTURE_CUBE_MAP: 0x8513,
    TEXTURE_BINDING_CUBE_MAP: 0x8514,
    TEXTURE_CUBE_MAP_POSITIVE_X: 0x8515,
    TEXTURE_CUBE_MAP_NEGATIVE_X: 0x8516,
    TEXTURE_CUBE_MAP_POSITIVE_Y: 0x8517,
    TEXTURE_CUBE_MAP_NEGATIVE_Y: 0x8518,
    TEXTURE_CUBE_MAP_POSITIVE_Z: 0x8519,
    TEXTURE_CUBE_MAP_NEGATIVE_Z: 0x851a,
    MAX_CUBE_MAP_TEXTURE_SIZE: 0x851c,
    TEXTURE0: 0x84c0,
    TEXTURE1: 0x84c1,
    TEXTURE2: 0x84c2,
    TEXTURE3: 0x84c3,
    TEXTURE4: 0x84c4,
    TEXTURE5: 0x84c5,
    TEXTURE6: 0x84c6,
    TEXTURE7: 0x84c7,
    TEXTURE8: 0x84c8,
    TEXTURE9: 0x84c9,
    TEXTURE10: 0x84ca,
    TEXTURE11: 0x84cb,
    TEXTURE12: 0x84cc,
    TEXTURE13: 0x84cd,
    TEXTURE14: 0x84ce,
    TEXTURE15: 0x84cf,
    TEXTURE16: 0x84d0,
    TEXTURE17: 0x84d1,
    TEXTURE18: 0x84d2,
    TEXTURE19: 0x84d3,
    TEXTURE20: 0x84d4,
    TEXTURE21: 0x84d5,
    TEXTURE22: 0x84d6,
    TEXTURE23: 0x84d7,
    TEXTURE24: 0x84d8,
    TEXTURE25: 0x84d9,
    TEXTURE26: 0x84da,
    TEXTURE27: 0x84db,
    TEXTURE28: 0x84dc,
    TEXTURE29: 0x84dd,
    TEXTURE30: 0x84de,
    TEXTURE31: 0x84df,
    ACTIVE_TEXTURE: 0x84e0,
    REPEAT: 0x2901,
    CLAMP_TO_EDGE: 0x812f,
    MIRRORED_REPEAT: 0x8370,
    FLOAT_VEC2: 0x8b50,
    FLOAT_VEC3: 0x8b51,
    FLOAT_VEC4: 0x8b52,
    INT_VEC2: 0x8b53,
    INT_VEC3: 0x8b54,
    INT_VEC4: 0x8b55,
    BOOL: 0x8b56,
    BOOL_VEC2: 0x8b57,
    BOOL_VEC3: 0x8b58,
    BOOL_VEC4: 0x8b59,
    FLOAT_MAT2: 0x8b5a,
    FLOAT_MAT3: 0x8b5b,
    FLOAT_MAT4: 0x8b5c,
    SAMPLER_2D: 0x8b5e,
    SAMPLER_CUBE: 0x8b60,
    VERTEX_ATTRIB_ARRAY_ENABLED: 0x8622,
    VERTEX_ATTRIB_ARRAY_SIZE: 0x8623,
    VERTEX_ATTRIB_ARRAY_STRIDE: 0x8624,
    VERTEX_ATTRIB_ARRAY_TYPE: 0x8625,
    VERTEX_ATTRIB_ARRAY_NORMALIZED: 0x886a,
    VERTEX_ATTRIB_ARRAY_POINTER: 0x8645,
    VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: 0x889f,
    IMPLEMENTATION_COLOR_READ_TYPE: 0x8b9a,
    IMPLEMENTATION_COLOR_READ_FORMAT: 0x8b9b,
    COMPILE_STATUS: 0x8b81,
    LOW_FLOAT: 0x8df0,
    MEDIUM_FLOAT: 0x8df1,
    HIGH_FLOAT: 0x8df2,
    LOW_INT: 0x8df3,
    MEDIUM_INT: 0x8df4,
    HIGH_INT: 0x8df5,
    FRAMEBUFFER: 0x8d40,
    RENDERBUFFER: 0x8d41,
    RGBA4: 0x8056,
    RGB5_A1: 0x8057,
    RGB565: 0x8d62,
    DEPTH_COMPONENT16: 0x81a5,
    STENCIL_INDEX: 0x1901,
    STENCIL_INDEX8: 0x8d48,
    DEPTH_STENCIL: 0x84f9,
    RENDERBUFFER_WIDTH: 0x8d42,
    RENDERBUFFER_HEIGHT: 0x8d43,
    RENDERBUFFER_INTERNAL_FORMAT: 0x8d44,
    RENDERBUFFER_RED_SIZE: 0x8d50,
    RENDERBUFFER_GREEN_SIZE: 0x8d51,
    RENDERBUFFER_BLUE_SIZE: 0x8d52,
    RENDERBUFFER_ALPHA_SIZE: 0x8d53,
    RENDERBUFFER_DEPTH_SIZE: 0x8d54,
    RENDERBUFFER_STENCIL_SIZE: 0x8d55,
    FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: 0x8cd0,
    FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: 0x8cd1,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: 0x8cd2,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: 0x8cd3,
    COLOR_ATTACHMENT0: 0x8ce0,
    DEPTH_ATTACHMENT: 0x8d00,
    STENCIL_ATTACHMENT: 0x8d20,
    DEPTH_STENCIL_ATTACHMENT: 0x821a,
    NONE: 0,
    FRAMEBUFFER_COMPLETE: 0x8cd5,
    FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 0x8cd6,
    FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 0x8cd7,
    FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 0x8cd9,
    FRAMEBUFFER_UNSUPPORTED: 0x8cdd,
    FRAMEBUFFER_BINDING: 0x8ca6,
    RENDERBUFFER_BINDING: 0x8ca7,
    MAX_RENDERBUFFER_SIZE: 0x84e8,
    INVALID_FRAMEBUFFER_OPERATION: 0x0506,
    UNPACK_FLIP_Y_WEBGL: 0x9240,
    UNPACK_PREMULTIPLY_ALPHA_WEBGL: 0x9241,
    CONTEXT_LOST_WEBGL: 0x9242,
    UNPACK_COLORSPACE_CONVERSION_WEBGL: 0x9243,
    BROWSER_DEFAULT_WEBGL: 0x9244,

    // WEBGL_compressed_texture_s3tc
    COMPRESSED_RGB_S3TC_DXT1_EXT: 0x83f0,
    COMPRESSED_RGBA_S3TC_DXT1_EXT: 0x83f1,
    COMPRESSED_RGBA_S3TC_DXT3_EXT: 0x83f2,
    COMPRESSED_RGBA_S3TC_DXT5_EXT: 0x83f3,

    // WEBGL_compressed_texture_pvrtc
    COMPRESSED_RGB_PVRTC_4BPPV1_IMG: 0x8c00,
    COMPRESSED_RGB_PVRTC_2BPPV1_IMG: 0x8c01,
    COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: 0x8c02,
    COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: 0x8c03,

    // WEBGL_compressed_texture_etc1
    COMPRESSED_RGB_ETC1_WEBGL: 0x8d64,

    // EXT_color_buffer_half_float
    HALF_FLOAT_OES: 0x8d61,

    // Desktop OpenGL
    DOUBLE: 0x140a,

    // WebGL 2
    READ_BUFFER: 0x0c02,
    UNPACK_ROW_LENGTH: 0x0cf2,
    UNPACK_SKIP_ROWS: 0x0cf3,
    UNPACK_SKIP_PIXELS: 0x0cf4,
    PACK_ROW_LENGTH: 0x0d02,
    PACK_SKIP_ROWS: 0x0d03,
    PACK_SKIP_PIXELS: 0x0d04,
    COLOR: 0x1800,
    DEPTH: 0x1801,
    STENCIL: 0x1802,
    RED: 0x1903,
    RGB8: 0x8051,
    RGBA8: 0x8058,
    RGB10_A2: 0x8059,
    TEXTURE_BINDING_3D: 0x806a,
    UNPACK_SKIP_IMAGES: 0x806d,
    UNPACK_IMAGE_HEIGHT: 0x806e,
    TEXTURE_3D: 0x806f,
    TEXTURE_WRAP_R: 0x8072,
    MAX_3D_TEXTURE_SIZE: 0x8073,
    UNSIGNED_INT_2_10_10_10_REV: 0x8368,
    MAX_ELEMENTS_VERTICES: 0x80e8,
    MAX_ELEMENTS_INDICES: 0x80e9,
    TEXTURE_MIN_LOD: 0x813a,
    TEXTURE_MAX_LOD: 0x813b,
    TEXTURE_BASE_LEVEL: 0x813c,
    TEXTURE_MAX_LEVEL: 0x813d,
    MIN: 0x8007,
    MAX: 0x8008,
    DEPTH_COMPONENT24: 0x81a6,
    MAX_TEXTURE_LOD_BIAS: 0x84fd,
    TEXTURE_COMPARE_MODE: 0x884c,
    TEXTURE_COMPARE_FUNC: 0x884d,
    CURRENT_QUERY: 0x8865,
    QUERY_RESULT: 0x8866,
    QUERY_RESULT_AVAILABLE: 0x8867,
    STREAM_READ: 0x88e1,
    STREAM_COPY: 0x88e2,
    STATIC_READ: 0x88e5,
    STATIC_COPY: 0x88e6,
    DYNAMIC_READ: 0x88e9,
    DYNAMIC_COPY: 0x88ea,
    MAX_DRAW_BUFFERS: 0x8824,
    DRAW_BUFFER0: 0x8825,
    DRAW_BUFFER1: 0x8826,
    DRAW_BUFFER2: 0x8827,
    DRAW_BUFFER3: 0x8828,
    DRAW_BUFFER4: 0x8829,
    DRAW_BUFFER5: 0x882a,
    DRAW_BUFFER6: 0x882b,
    DRAW_BUFFER7: 0x882c,
    DRAW_BUFFER8: 0x882d,
    DRAW_BUFFER9: 0x882e,
    DRAW_BUFFER10: 0x882f,
    DRAW_BUFFER11: 0x8830,
    DRAW_BUFFER12: 0x8831,
    DRAW_BUFFER13: 0x8832,
    DRAW_BUFFER14: 0x8833,
    DRAW_BUFFER15: 0x8834,
    MAX_FRAGMENT_UNIFORM_COMPONENTS: 0x8b49,
    MAX_VERTEX_UNIFORM_COMPONENTS: 0x8b4a,
    SAMPLER_3D: 0x8b5f,
    SAMPLER_2D_SHADOW: 0x8b62,
    FRAGMENT_SHADER_DERIVATIVE_HINT: 0x8b8b,
    PIXEL_PACK_BUFFER: 0x88eb,
    PIXEL_UNPACK_BUFFER: 0x88ec,
    PIXEL_PACK_BUFFER_BINDING: 0x88ed,
    PIXEL_UNPACK_BUFFER_BINDING: 0x88ef,
    FLOAT_MAT2x3: 0x8b65,
    FLOAT_MAT2x4: 0x8b66,
    FLOAT_MAT3x2: 0x8b67,
    FLOAT_MAT3x4: 0x8b68,
    FLOAT_MAT4x2: 0x8b69,
    FLOAT_MAT4x3: 0x8b6a,
    SRGB: 0x8c40,
    SRGB8: 0x8c41,
    SRGB8_ALPHA8: 0x8c43,
    COMPARE_REF_TO_TEXTURE: 0x884e,
    RGBA32F: 0x8814,
    RGB32F: 0x8815,
    RGBA16F: 0x881a,
    RGB16F: 0x881b,
    VERTEX_ATTRIB_ARRAY_INTEGER: 0x88fd,
    MAX_ARRAY_TEXTURE_LAYERS: 0x88ff,
    MIN_PROGRAM_TEXEL_OFFSET: 0x8904,
    MAX_PROGRAM_TEXEL_OFFSET: 0x8905,
    MAX_VARYING_COMPONENTS: 0x8b4b,
    TEXTURE_2D_ARRAY: 0x8c1a,
    TEXTURE_BINDING_2D_ARRAY: 0x8c1d,
    R11F_G11F_B10F: 0x8c3a,
    UNSIGNED_INT_10F_11F_11F_REV: 0x8c3b,
    RGB9_E5: 0x8c3d,
    UNSIGNED_INT_5_9_9_9_REV: 0x8c3e,
    TRANSFORM_FEEDBACK_BUFFER_MODE: 0x8c7f,
    MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: 0x8c80,
    TRANSFORM_FEEDBACK_VARYINGS: 0x8c83,
    TRANSFORM_FEEDBACK_BUFFER_START: 0x8c84,
    TRANSFORM_FEEDBACK_BUFFER_SIZE: 0x8c85,
    TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: 0x8c88,
    RASTERIZER_DISCARD: 0x8c89,
    MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: 0x8c8a,
    MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: 0x8c8b,
    INTERLEAVED_ATTRIBS: 0x8c8c,
    SEPARATE_ATTRIBS: 0x8c8d,
    TRANSFORM_FEEDBACK_BUFFER: 0x8c8e,
    TRANSFORM_FEEDBACK_BUFFER_BINDING: 0x8c8f,
    RGBA32UI: 0x8d70,
    RGB32UI: 0x8d71,
    RGBA16UI: 0x8d76,
    RGB16UI: 0x8d77,
    RGBA8UI: 0x8d7c,
    RGB8UI: 0x8d7d,
    RGBA32I: 0x8d82,
    RGB32I: 0x8d83,
    RGBA16I: 0x8d88,
    RGB16I: 0x8d89,
    RGBA8I: 0x8d8e,
    RGB8I: 0x8d8f,
    RED_INTEGER: 0x8d94,
    RGB_INTEGER: 0x8d98,
    RGBA_INTEGER: 0x8d99,
    SAMPLER_2D_ARRAY: 0x8dc1,
    SAMPLER_2D_ARRAY_SHADOW: 0x8dc4,
    SAMPLER_CUBE_SHADOW: 0x8dc5,
    UNSIGNED_INT_VEC2: 0x8dc6,
    UNSIGNED_INT_VEC3: 0x8dc7,
    UNSIGNED_INT_VEC4: 0x8dc8,
    INT_SAMPLER_2D: 0x8dca,
    INT_SAMPLER_3D: 0x8dcb,
    INT_SAMPLER_CUBE: 0x8dcc,
    INT_SAMPLER_2D_ARRAY: 0x8dcf,
    UNSIGNED_INT_SAMPLER_2D: 0x8dd2,
    UNSIGNED_INT_SAMPLER_3D: 0x8dd3,
    UNSIGNED_INT_SAMPLER_CUBE: 0x8dd4,
    UNSIGNED_INT_SAMPLER_2D_ARRAY: 0x8dd7,
    DEPTH_COMPONENT32F: 0x8cac,
    DEPTH32F_STENCIL8: 0x8cad,
    FLOAT_32_UNSIGNED_INT_24_8_REV: 0x8dad,
    FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: 0x8210,
    FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: 0x8211,
    FRAMEBUFFER_ATTACHMENT_RED_SIZE: 0x8212,
    FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: 0x8213,
    FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: 0x8214,
    FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: 0x8215,
    FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: 0x8216,
    FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: 0x8217,
    FRAMEBUFFER_DEFAULT: 0x8218,
    UNSIGNED_INT_24_8: 0x84fa,
    DEPTH24_STENCIL8: 0x88f0,
    UNSIGNED_NORMALIZED: 0x8c17,
    DRAW_FRAMEBUFFER_BINDING: 0x8ca6, // Same as FRAMEBUFFER_BINDING
    READ_FRAMEBUFFER: 0x8ca8,
    DRAW_FRAMEBUFFER: 0x8ca9,
    READ_FRAMEBUFFER_BINDING: 0x8caa,
    RENDERBUFFER_SAMPLES: 0x8cab,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: 0x8cd4,
    MAX_COLOR_ATTACHMENTS: 0x8cdf,
    COLOR_ATTACHMENT1: 0x8ce1,
    COLOR_ATTACHMENT2: 0x8ce2,
    COLOR_ATTACHMENT3: 0x8ce3,
    COLOR_ATTACHMENT4: 0x8ce4,
    COLOR_ATTACHMENT5: 0x8ce5,
    COLOR_ATTACHMENT6: 0x8ce6,
    COLOR_ATTACHMENT7: 0x8ce7,
    COLOR_ATTACHMENT8: 0x8ce8,
    COLOR_ATTACHMENT9: 0x8ce9,
    COLOR_ATTACHMENT10: 0x8cea,
    COLOR_ATTACHMENT11: 0x8ceb,
    COLOR_ATTACHMENT12: 0x8cec,
    COLOR_ATTACHMENT13: 0x8ced,
    COLOR_ATTACHMENT14: 0x8cee,
    COLOR_ATTACHMENT15: 0x8cef,
    FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: 0x8d56,
    MAX_SAMPLES: 0x8d57,
    HALF_FLOAT: 0x140b,
    RG: 0x8227,
    RG_INTEGER: 0x8228,
    R8: 0x8229,
    RG8: 0x822b,
    R16F: 0x822d,
    R32F: 0x822e,
    RG16F: 0x822f,
    RG32F: 0x8230,
    R8I: 0x8231,
    R8UI: 0x8232,
    R16I: 0x8233,
    R16UI: 0x8234,
    R32I: 0x8235,
    R32UI: 0x8236,
    RG8I: 0x8237,
    RG8UI: 0x8238,
    RG16I: 0x8239,
    RG16UI: 0x823a,
    RG32I: 0x823b,
    RG32UI: 0x823c,
    VERTEX_ARRAY_BINDING: 0x85b5,
    R8_SNORM: 0x8f94,
    RG8_SNORM: 0x8f95,
    RGB8_SNORM: 0x8f96,
    RGBA8_SNORM: 0x8f97,
    SIGNED_NORMALIZED: 0x8f9c,
    COPY_READ_BUFFER: 0x8f36,
    COPY_WRITE_BUFFER: 0x8f37,
    COPY_READ_BUFFER_BINDING: 0x8f36, // Same as COPY_READ_BUFFER
    COPY_WRITE_BUFFER_BINDING: 0x8f37, // Same as COPY_WRITE_BUFFER
    UNIFORM_BUFFER: 0x8a11,
    UNIFORM_BUFFER_BINDING: 0x8a28,
    UNIFORM_BUFFER_START: 0x8a29,
    UNIFORM_BUFFER_SIZE: 0x8a2a,
    MAX_VERTEX_UNIFORM_BLOCKS: 0x8a2b,
    MAX_FRAGMENT_UNIFORM_BLOCKS: 0x8a2d,
    MAX_COMBINED_UNIFORM_BLOCKS: 0x8a2e,
    MAX_UNIFORM_BUFFER_BINDINGS: 0x8a2f,
    MAX_UNIFORM_BLOCK_SIZE: 0x8a30,
    MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: 0x8a31,
    MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: 0x8a33,
    UNIFORM_BUFFER_OFFSET_ALIGNMENT: 0x8a34,
    ACTIVE_UNIFORM_BLOCKS: 0x8a36,
    UNIFORM_TYPE: 0x8a37,
    UNIFORM_SIZE: 0x8a38,
    UNIFORM_BLOCK_INDEX: 0x8a3a,
    UNIFORM_OFFSET: 0x8a3b,
    UNIFORM_ARRAY_STRIDE: 0x8a3c,
    UNIFORM_MATRIX_STRIDE: 0x8a3d,
    UNIFORM_IS_ROW_MAJOR: 0x8a3e,
    UNIFORM_BLOCK_BINDING: 0x8a3f,
    UNIFORM_BLOCK_DATA_SIZE: 0x8a40,
    UNIFORM_BLOCK_ACTIVE_UNIFORMS: 0x8a42,
    UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: 0x8a43,
    UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: 0x8a44,
    UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: 0x8a46,
    INVALID_INDEX: 0xffffffff,
    MAX_VERTEX_OUTPUT_COMPONENTS: 0x9122,
    MAX_FRAGMENT_INPUT_COMPONENTS: 0x9125,
    MAX_SERVER_WAIT_TIMEOUT: 0x9111,
    OBJECT_TYPE: 0x9112,
    SYNC_CONDITION: 0x9113,
    SYNC_STATUS: 0x9114,
    SYNC_FLAGS: 0x9115,
    SYNC_FENCE: 0x9116,
    SYNC_GPU_COMMANDS_COMPLETE: 0x9117,
    UNSIGNALED: 0x9118,
    SIGNALED: 0x9119,
    ALREADY_SIGNALED: 0x911a,
    TIMEOUT_EXPIRED: 0x911b,
    CONDITION_SATISFIED: 0x911c,
    WAIT_FAILED: 0x911d,
    SYNC_FLUSH_COMMANDS_BIT: 0x00000001,
    VERTEX_ATTRIB_ARRAY_DIVISOR: 0x88fe,
    ANY_SAMPLES_PASSED: 0x8c2f,
    ANY_SAMPLES_PASSED_CONSERVATIVE: 0x8d6a,
    SAMPLER_BINDING: 0x8919,
    RGB10_A2UI: 0x906f,
    INT_2_10_10_10_REV: 0x8d9f,
    TRANSFORM_FEEDBACK: 0x8e22,
    TRANSFORM_FEEDBACK_PAUSED: 0x8e23,
    TRANSFORM_FEEDBACK_ACTIVE: 0x8e24,
    TRANSFORM_FEEDBACK_BINDING: 0x8e25,
    COMPRESSED_R11_EAC: 0x9270,
    COMPRESSED_SIGNED_R11_EAC: 0x9271,
    COMPRESSED_RG11_EAC: 0x9272,
    COMPRESSED_SIGNED_RG11_EAC: 0x9273,
    COMPRESSED_RGB8_ETC2: 0x9274,
    COMPRESSED_SRGB8_ETC2: 0x9275,
    COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: 0x9276,
    COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: 0x9277,
    COMPRESSED_RGBA8_ETC2_EAC: 0x9278,
    COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: 0x9279,
    TEXTURE_IMMUTABLE_FORMAT: 0x912f,
    MAX_ELEMENT_INDEX: 0x8d6b,
    TEXTURE_IMMUTABLE_LEVELS: 0x82df,

    // Extensions
    MAX_TEXTURE_MAX_ANISOTROPY_EXT: 0x84ff,
  };
  var WebGLConstants$1 = Object.freeze(WebGLConstants);

  exports.WebGLConstants = WebGLConstants$1;

});
